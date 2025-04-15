import { errors } from 'celebrate';
import cors from 'cors';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { DB_ADDRESS, PORT } from './config';
import { CustomError } from './errors/custom-error';
import { errorsLogger, requestLogger } from './middlewars/logger';
import { orderRouter, productRouter } from './routes';

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(requestLogger);

mongoose.connect(DB_ADDRESS);

app.get('/images/:file', (req: Request, res: Response) => {
  const { file } = req.params;
  res.sendFile(path.join(__dirname, 'public', 'images', file));
});

app.use('/product', productRouter);
app.use('/order', orderRouter);

app.use(errorsLogger);

app.use(errors());
app.use((err: any, _: Request, res: Response, __: NextFunction) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ message: err.message });
  }

  return res.status(500).send({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`Listen on port ${PORT}`);
});
