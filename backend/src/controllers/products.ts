import { NextFunction, Request, Response } from 'express';
import { ConflictError } from '../errors/conflict-error';
import Product from '../models/product';

export const getAllProducts = async (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await Product.find({});
    res.send({ items: products, total: products.length });
  } catch (e) {
    next(new Error('Ошибка на стороне сервера'));
  }
};

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
    next(new ConflictError((e as Error).message));
  }
};
