import express from 'express';
import transactionController from '../controllers/transactionController';
import { validateTransaction } from '../middleware/validateTransaction';
const router = express.Router();

// Process a payment
router.post('/process', validateTransaction, transactionController.processTransaction);

// Get all transactions for a user
router.get('/', transactionController.getAllTransaction);

// Get a transaction by ID
router.get('/:id', transactionController.getTransactionById);

export default router;