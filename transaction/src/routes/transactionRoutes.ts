import express from 'express';
import transactionController from '../controllers/transactionController';
import { validateTransaction } from '../middleware/validateTransaction';
const router = express.Router();

// Process a payment
router.post('/process', validateTransaction, transactionController.processTransaction);
router.get('/', transactionController.getAllTransaction);
export default router;