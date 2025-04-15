import { faker } from '@faker-js/faker';
import { NextFunction, Request, Response } from 'express';
import { BadRequestError } from '../errors/bad-request-error';
import Product from '../model/product';

export enum Payment {
  CARD = 'card',
  ONLINE = 'online',
}

interface IOrder {
  payment: Payment;
  email: string;
  phone: string;
  address: string;
  total: number;
  items: string[];
}

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { total, items }: IOrder = req.body;

  const foundProducts = await Product.find({ _id: { $in: items } });

  const foundIds = foundProducts.map((p) => p._id.toString());
  const notFoundId = items.find((id) => !foundIds.includes(id));

  if (notFoundId) {
    next(new BadRequestError(`Товар с id ${notFoundId} не найден`));
    return;
  }

  const productWithoutPrice = foundProducts.find((p) => p.price === null);

  if (productWithoutPrice) {
    next(
      new BadRequestError(`Товар с id ${productWithoutPrice._id} не продается`)
    );
    return;
  }

  const totalPrice = foundProducts.reduce(
    (acc, product) => acc + (product.price as number),
    0
  );

  if (totalPrice !== total) {
    next(new BadRequestError('Неверная сумма заказа'));
    return;
  }

  res.send({ id: faker.string.uuid(), total });
};
