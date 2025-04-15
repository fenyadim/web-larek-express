import { errors } from 'celebrate';
import cors from 'cors';
import 'dotenv/config';
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import path from 'path';
import orderRouter from './routes/order';
import productRouter from './routes/products';

const DB_ADDRESS = process.env.DB_ADDRESS || '';
const PORT = process.env.PORT || '3000';

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'images')));

mongoose.connect(DB_ADDRESS);

app.get('/images/:file', (req: Request, res: Response) => {
  const { file } = req.params;
  res.sendFile(path.join(__dirname, 'images', file));
});

app.use('/product', productRouter);
app.use('/order', orderRouter);

app.use(errors());

app.listen(PORT, () => {
  console.log(`Listen on port ${PORT}`);
});
