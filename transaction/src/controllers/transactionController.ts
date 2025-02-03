import { Request, Response } from 'express';
import { Transaction } from '../models/transactionModel';
import transactionService from '../services/transactionService';

const transactionController = {
/**
 * @swagger
 * /api/transactions/process:
 *   post:
 *     summary: Process a new payment transaction
 *     description: Handles a new payment transaction request.
 *     tags: [Transactions]
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
}
export default transactionController;