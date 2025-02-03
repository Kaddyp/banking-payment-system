
import express from 'express';
import authController from '../controllers/authController';
import { authenticateToken } from '../middleware/authMiddleware';
const router = express.Router();

router.post('/signup', authController.signup);
router.post('/signin', authController.signin);
router.post('/signout', authenticateToken, authController.signout); 


export default router;