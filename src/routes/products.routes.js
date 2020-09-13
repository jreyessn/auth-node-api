import { Router } from 'express';
import * as ProductsController from '../controllers/ProductsController';

const router = Router()

router.get('/', ProductsController.index)
router.post('/', ProductsController.store)
router.get('/:id', ProductsController.show)
router.put('/:id', ProductsController.update)
router.delete('/:id', ProductsController.destroy)


export default router;