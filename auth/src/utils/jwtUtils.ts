import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const generateToken = (userId: number) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET_KEY as string, { expiresIn: "1h" });
};
