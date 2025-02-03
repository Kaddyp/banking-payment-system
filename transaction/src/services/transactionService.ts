import pool from '../config/db';
import { Transaction } from '../models/transactionModel';
import { v4 as uuidv4 } from "uuid";

const transactionService = {
  /*** Process Transaction ***/  
  async processTransaction(data: Transaction): Promise<{ status: number; success: boolean; message: string }> {
    try{
        const { amount, currency, status, paymentMethod } = data;
        const result = await pool.query(
          `INSERT INTO transactions (amount, currency, status, payment_method) 
           VALUES ($1, $2, $3, $4) RETURNING *`,
          [amount, currency, status, paymentMethod]
        );
        return { status: 201, success: true, message: "Transaction successfully processed."};
    } catch (error) {
        console.error("Internal Server Error Error:", error);
        return { status: 500, success: false, message: "Internal Server Error" };
    }
  },
}
export default transactionService;