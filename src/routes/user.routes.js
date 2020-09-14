import { Router } from 'express';
import { authjwt, verifySignup } from '../middlewares'
import * as UserController from '../controllers/UserController';

const router = Router()

router.get('/', [ 

	authjwt.verifyToken, 
	authjwt.isAdmin

], UserController.index)

router.post('/', [ 

	authjwt.verifyToken, 
	authjwt.isAdmin,
	verifySignup.checkRolesExisted,
	verifySignup.checkDuplicateUser

], UserController.store)


export default router;