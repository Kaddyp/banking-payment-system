import { Request, Response } from 'express';
import { Transaction } from '../models/transactionModel';
import transactionService from '../services/transactionService';

const transactionController = {
/**
 * @swagger
 * /api/transactions/process:
 *   post:
 *     summary: Process a new payment transaction
 *     description: Handles a new payment transaction request. (Queued via Kafka)
 *     tags:
 *       - Transactions
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [amount, currency, paymentMethod]
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 50.75
 *               currency:
 *                 type: string
 *                 enum: [USD, EUR, GBP]
 *                 example: USD
 *               status:
 *                 type: string
 *                 enum: [PENDING, SUCCESS, FAILED, REFUNDED]
 *                 example: PENDING
 *               paymentMethod:
 *                 type: string
 *                 enum: [CARD, MOBILE_WALLET, CASH]
 *                 example: CARD
 *     responses:
 *       201:
 *         description: Transaction successfully processed.
 *       400:
 *         description: Invalid input data.
 */    
  async processTransaction(req: Request, res: Response): Promise<void> {            
      const result = await transactionService.processTransaction(req.body);
      res.status(result.status).json(result);        
  },

/**
 * @swagger
 * /api/transactions:
 *   get:
 *     summary: Get all transactions
 *     description: Get all transaction request.
 *     tags:
 *       - Transactions
 *     responses:
 *       200:
 *         description: List of transactions
 */
  async getAllTransaction(req: Request, res: Response): Promise<void>  {
      try {
          const result = await transactionService.getAllTransactions();
          res.status(result.status).json(result);
        } catch (error) {
          res.status(500).json({ error: 'Failed to fetch transactions.' });
        }
  },
/**
 * @swagger
 * /api/transactions/{id}:
 *   get:
 *     summary: Get a transaction by ID
 *     description: Get transaction by ID.
 *     tags:
 *       - Transactions
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Transaction details
 *       404:
 *         description: Transaction not found
 */
  async getTransactionById(req: Request, res: Response): Promise<void> {
    try {
      const result = await transactionService.getTransactionById(req.params.id);
      res.status(result.status).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch transaction.' });
    }
  },

/**
 * @swagger
 * /api/transactions/{id}:
 *   delete:
 *     summary: Delete a transaction by ID
 *     description: Delete a transaction by ID.
 *     tags:
 *       - Transactions
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Transaction deleted successfully
 */
  async deleteTransaction(req: Request, res: Response): Promise<void> {
    try {
      const result = await transactionService.deleteTransactionById(req.params.id);
      res.status(result.status).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete transaction.' });
    }
  }
}
export default transactionController;