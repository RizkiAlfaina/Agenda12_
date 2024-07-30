import { Router } from 'express';
import { checkDuplicateUsernameOrEmail, checkRolesExisted } from '../middleware/verifySignUp.js';
import { signup, signin, signout, resetPassword, updateProfile } from '../controllers/auth.controller.js';

const router = Router();

router.post('/signup', [
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
], signup);

router.post('/signin', signin);

router.post('/signout', signout);

router.post('/reset-password', resetPassword);

// Change PATCH to POST for updateProfile route
router.post('/updateProfile/:id', updateProfile);

export default router;
