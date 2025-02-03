import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

// Middleware to authenticate token
export const authenticateToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Get the token from the request header
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      res.status(401).json({ success: false, message: "Unauthorized: No token provided" })
      return;
    }
   
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!);
    (req as any).user = decoded; // Attach user info to request
    next();  // Proceed to the next middleware or route handler

  } catch (error) {
    res.status(403).json({ success: false, message: "Forbidden: Invalid token" })
    return;
  }





    

    // // Decode the token
    // const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY || '') as DecodedToken;
    // // Query the database to verify the user exists
    // const [rows] = await db.query(
    //   `SELECT * FROM User WHERE id = ?`,
    //   [decoded.id]
    // );
    // // Check if the user was found
    // if ((rows as any[]).length === 0) {
    //   res.status(401).json({ error: 'Unauthorized' });
    //   return;
    // }
    // // Attach user information to the request object
    // (req as any).user = (rows as any[])[0];

    // next(); // Proceed to the next middleware or route handler
 
};