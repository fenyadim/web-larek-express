import { faker } from '@faker-js/faker';
import { Joi } from 'celebrate';
import { Request, Response } from 'express';
import Product from '../model/product';

enum Payment {
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

export const orderSchema = Joi.object({
  total: Joi.number().required(),
  payment: Joi.string()
    .valid(...Object.values(Payment))
    .required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  address: Joi.string().required(),
  items: Joi.array().items(Joi.string()).min(1),
});

export const createOrder = async (req: Request, res: Response) => {
  const { total, items }: IOrder = req.body;

  let totalPrice = 0;
  items.forEach((itemId) => {
    Product.findById(itemId).then((product) => {
      console.log(product!.price);
      totalPrice += product!.price;
    });
  });

  console.log(totalPrice);

  // if (totalPrice !== total) {
  //   res.status(400).send({ message: 'Неверная сумма заказа' });
  //   return;
  // }

  res.send({ id: faker.string.uuid(), total });
};
