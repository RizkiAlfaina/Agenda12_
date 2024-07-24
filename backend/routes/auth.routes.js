import { Router } from 'express';
import { checkDuplicateUsernameOrEmail, checkRolesExisted } from '../middleware/verifySignUp.js';
import { signup, signin, signout } from '../controllers/auth.controller.js';

const router = Router();

router.post('/signup', [
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
], signup);

router.post('/signin', signin);

router.post('/signout', signout);

export default router;
