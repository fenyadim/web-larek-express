import { NextFunction, Request, Response } from 'express';
import { Error as MongooseError } from 'mongoose';
import { BadRequestError, ConflictError } from '../errors';
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
    res.status(201).send(product);
  } catch (e) {
    if (e instanceof MongooseError.ValidationError) {
      next(new BadRequestError(e.message));
      return;
    }

    if (e instanceof Error && e.message.includes('E11000')) {
      next(new ConflictError(e.message));
      return;
    }

    next(new Error((e as Error).message));
  }
};
