import { Router } from 'express';
import * as AuthController from '../controllers/AuthController';
import { verifySignup } from '../middlewares'

const router = Router();

router.post('/signin', AuthController.signIn);
router.post('/signup', verifySignup.checkDuplicateUser ,AuthController.signUp);

export default router;