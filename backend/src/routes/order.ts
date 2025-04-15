import { celebrate, Segments } from 'celebrate';
import { Router } from 'express';
import { createOrder, orderSchema } from '../controllers/order';

const router = Router();

const orderRouteValidator = celebrate({
  [Segments.BODY]: orderSchema,
});

router.post('/', orderRouteValidator, createOrder);

export default router;
