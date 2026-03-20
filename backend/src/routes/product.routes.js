import { Router } from 'express';
import * as ctrl from '../controllers/product.controller.js';

const router = Router();

router.get('/products', ctrl.getAll);
router.get('/products/:id', ctrl.getById);
router.post('/products', ctrl.create);
router.put('/products/:id', ctrl.update);
router.patch('/products/:id', ctrl.patch);
router.delete('/products/:id', ctrl.remove);