import { Router } from 'express';
import * as ProductsController from '../controllers/ProductsController';

import { authjwt } from '../middlewares'

const router = Router()

router.get('/', ProductsController.index)

router.post('/', [ authjwt.verifyToken, authjwt.isModerator ], ProductsController.store)

router.get('/:id', ProductsController.show)

router.put('/:id', [ authjwt.verifyToken, authjwt.isModerator], ProductsController.update)

router.delete('/:id', [ authjwt.verifyToken, authjwt.isModerator, authjwt.isAdmin ], ProductsController.destroy)


export default router;