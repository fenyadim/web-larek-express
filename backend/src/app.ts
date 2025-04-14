// eslint-disable-next-line import/no-extraneous-dependencies
import 'dotenv/config';
// eslint-disable-next-line import/no-extraneous-dependencies
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import { createProduct, getAllProducts } from './controllers/products';

const app = express();
app.use(cors());

mongoose.connect(process.env.DB_ADDRESS as string);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/product', getAllProducts);
app.post('/product', createProduct);

app.listen(3000, () => {
  console.log('Listen on port 3000');
});
