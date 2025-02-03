// src/controllers/userController.ts
import { Request, Response } from 'express';
import { User } from '../types/user';
import authService from '../services/authService';

const authController = {
  /**
   * @swagger
   * /api/auth/signup:
   *   post:
   *     summary: Signup a new user
   *     description: Creates a new user with a hashed password.
   *     tags:
   *       - Authentication
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *                 example: "john@gmail.com"
   *               password:
   *                 type: string
   *                 example: "securePassword123"
   *     responses:
   *       201:
   *         description: User registered successfully
   *       400:
   *         description: Email and password are required
   *       409:
   *         description: Email already registered
   *       500:
   *         description: Internal Server Error
   */
  async signup(req: Request, res: Response) {
    try {     
      const result = await authService.signup(req.body);
      res.status(result.status).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create User' });
    }
  },




/**
 * @swagger
 * /api/auth/signin:
 *   post:
 *     summary: Sign in a user
 *     description: Authenticates a user and returns a JWT token.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "john@gmail.com"
 *               password:
 *                 type: string
 *                 example: "securePassword123"
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Email and password are required
 *       401:
 *         description: Invalid email or password
 *       500:
 *         description: Internal Server Error
 */
  async signin(req: Request, res: Response) {
    try {     
      const result = await authService.signin(req.body);
      res.status(result.status).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to login User' });
    }
  },



/**
 * @swagger
 * /api/auth/signout:
 *   post:
 *     summary: Sign out a user
 *     description: Invalidates the user's token.
 *     tags:
 *       - Authentication
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User signed out successfully
 *       400:
 *         description: Token is required
 *       500:
 *         description: Internal Server Error
 */
  async signout(req: Request, res: Response): Promise<void> {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      res.status(400).json({ success: false, message: "Token is required" });
      return;
    }

    const result = await authService.signout(token);
    res.status(result.status).json(result);
  },

};
export default authController;