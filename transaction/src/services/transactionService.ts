import pool from '../config/db';
import { Transaction } from '../models/transactionModel';
import { v4 as uuidv4 } from "uuid";
const transactions: Transaction[] = [];

const transactionService = {
  /*** Process Transaction ***/  
  async processTransaction(data: Transaction): Promise<{ status: number; success: boolean; message: string }> {
    try{
        const { amount, currency, paymentMethod } = data;
        const newTransaction: Transaction = {
            id: uuidv4(),
            amount,
            currency,
            paymentMethod,
            status: "PENDING",
            createdAt: new Date(),
          };
        
        // Simulate payment processing
        newTransaction.status = Math.random() > 0.1 ? "SUCCESS" : "FAILED";
    
        transactions.push(newTransaction);
        return { status: 201, success: true, message: "Transaction successfully processed."};
    } catch (error) {
        console.error("Internal Server Error Error:", error);
        return { status: 500, success: false, message: "Internal Server Error" };
    }
  },
}
export default transactionService;