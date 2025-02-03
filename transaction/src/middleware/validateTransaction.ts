import { Request, Response, NextFunction } from "express";

export const validateTransaction  = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try{
      const { amount, currency, paymentMethod } = req.body;

      if (typeof amount !== "number" || amount <= 0) {
        res.status(400).json({ error: "Invalid amount" });
        return;
      }

      if (!["USD", "EUR", "GBP"].includes(currency)) {
        res.status(400).json({ error: "Unsupported currency" });
        return;
      }

      if (!["CARD", "MOBILE_WALLET", "CASH"].includes(paymentMethod)) {
        res.status(400).json({ error: "Invalid payment method" });
        return;
      }

      next();
  }
  catch (error) {
    res.status(400).json({ success: false, message: "Invalid input data" })
    return;
  }

};