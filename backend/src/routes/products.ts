import { Router } from 'express';
import { createProduct, getAllProducts } from '../controllers/products';
import { productRouteValidator } from '../middlewars/validate';

const router = Router();

router.get('/', getAllProducts);
router.post('/', productRouteValidator, createProduct);

export default router;
