import express from 'express'
import { userController } from './user.controller';
import authentication from '../../middleware/authentication';
import { UserRole } from '../../lib/auth';

const router = express.Router();

router.get('/admin/users', authentication(UserRole.ADMIN), userController.getAllUser);
router.put('/users/:userId', authentication(UserRole.ADMIN,UserRole.STUDENT,UserRole.TUTOR), userController.updateUser);
router.put('/admin/users/:userId', authentication(UserRole.ADMIN), userController.updateUserStatus);


export const userRouter = router;