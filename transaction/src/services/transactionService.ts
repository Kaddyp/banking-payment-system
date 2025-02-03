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
  /*** Get All Transactions ***/
  async getAllTransactions(): Promise<{ status: number; success: boolean; data: Transaction[] }> {
    try {
      const result = await pool.query("SELECT * FROM transactions ORDER BY created_at DESC;");
      return { status: 200, success: true, data: result.rows as Transaction[]};
    } catch (error) {
      console.error("Internal Server Error Error:", error);
      throw new Error("Internal Server Error");
    }
  },
  /*** Get Transaction By ID ***/
  async getTransactionById(id: string): Promise<{ status: number; success: boolean; message?: string, data?: Transaction | null }> {
    try {
      const result = await pool.query("SELECT * FROM transactions WHERE id = $1;", [id]);
      if (result.rows.length === 0) {
        return { status: 404, success: false, message: "Transaction not found" };
      }
      return { status: 200, success: true, data: result.rows[0] || null };
    } catch (error) {
      console.error("Internal Server Error Error:", error);
      throw new Error("Internal Server Error");
    }
  },
  
}
export default transactionService;