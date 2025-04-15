import { Request, Response } from 'express';
import { Error } from 'mongoose';
import Product from '../model/product';

export const getAllProducts = async (_: Request, res: Response) => {
  try {
    const products = await Product.find({});
    res.send({ items: products, total: products.length });
  } catch (e) {
    res.status(400).send({ message: 'Not found' });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  const { title, category, description, image, price } = req.body;

  try {
    const product = await Product.create({
      title,
      category,
      description,
      image,
      price,
    });
    res.send(product);
  } catch (e) {
    res.status(400).send({ message: (e as Error).message });
  }
};
