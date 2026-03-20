import { Router } from 'express';
import * as ctrl from '../controllers/product.controllers.js';

const router = Router();

router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getById);
router.post('/', ctrl.create);
router.put('/:id', ctrl.update);
router.patch('/:id', ctrl.patch);
router.delete('/:id', ctrl.remove);

export default router;