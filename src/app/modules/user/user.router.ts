import express from 'express'
import { userController } from './user.controller';
import authentication from '../../middleware/authentication';
import { UserRole } from '../../lib/auth';

const router = express.Router();



router.get('/', authentication(UserRole.ADMIN), userController.getAllUser);
router.put('/:userId', authentication(UserRole.ADMIN, UserRole.STUDENT, UserRole.TUTOR), userController.updateUser);
router.put('/:userId', authentication(UserRole.ADMIN), userController.updateUserStatus);


export const userRoutes = router;