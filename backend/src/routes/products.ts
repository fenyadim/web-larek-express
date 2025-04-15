import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { createProduct, getAllProducts } from '../controllers/products';

const router = Router();

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

const productRouteValidator = celebrate({
  [Segments.BODY]: productSchema,
});

router.get('/', getAllProducts);
router.post('/', productRouteValidator, createProduct);

export default router;
