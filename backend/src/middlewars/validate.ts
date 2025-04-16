import { celebrate, Joi, Segments } from 'celebrate';
import { Payment } from '../controllers/order';

const productSchema = Joi.object({
  title: Joi.string().required().min(2).max(30),
  category: Joi.string().required(),
  description: Joi.string(),
  price: Joi.number().default(null),
  image: Joi.object({
    fileName: Joi.string(),
    originalName: Joi.string(),
  }).required(),
});

export const productRouteValidator = celebrate({
  [Segments.BODY]: productSchema,
});

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

export const orderRouteValidator = celebrate({
  [Segments.BODY]: orderSchema,
});
