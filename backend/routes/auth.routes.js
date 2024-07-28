import { Router } from 'express';
import { checkDuplicateUsernameOrEmail, checkRolesExisted } from '../middleware/verifySignUp.js';
import { signup, signin, signout, resetPassword } from '../controllers/auth.controller.js';

const router = Router();

router.post('/signup', [
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
], signup);

router.post('/signin', signin);

router.post('/signout', signout);

router.post('/reset-password', resetPassword);

export default router;
