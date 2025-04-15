import { Router } from 'express';
import { createOrder } from '../controllers/order';
import { orderRouteValidator } from '../middlewars/validate';

const router = Router();

router.post('/', orderRouteValidator, createOrder);

export default router;
