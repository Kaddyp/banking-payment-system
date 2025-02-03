import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from '../config/db';
import { User } from '../types/user';
import { generateToken } from "../utils/jwtUtils";

const authService = {
  /*** Signup User ***/
  async signup(data: User) {
    try{
      const { email, password } = data;
      
      // ✅ Check if email and password are provided
      if (!email || !password) {
        return { status: 400, success: false, message: "Username and password are required" };
      }

      // Check if email is already registered
      const existingUser = await pool.query(
        `SELECT * FROM users WHERE email = $1`,
        [email]
      );
      if (existingUser.rows.length > 0) {
        return { status: 409, success: false, message: "Email already registered", user: existingUser.rows[0] };
      }
   
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      // Create the user
      const result = await pool.query(
        "INSERT INTO users (email, password) VALUES ($1, $2)",
        [email, hashedPassword]
      );
      return { status: 201, success: true, message: "User registered successfully", user: result.rows[0] };
    } catch (error) {
      console.error("Registration Error:", error);
      return { status: 500, success: false, message: "Internal Server Error" };
    }
  },

  /*** Signin User ***/
  async signin(data: User) {
    try{
        const { email, password } = data;

        // ✅ Check if email and password are provided
          if (!email || !password) {
          return { status: 400, success: false, message: "Email and password are required" };
        }

        // Check if user exists
        const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

        if (result.rows.length === 0) {
          return { status: 401, success: false, message: "Invalid email or password" };
        }

        const user = result.rows[0];

      // Verify the password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return { status: 401, success: false, message: "Invalid username or password" };
      }

      // Generate JWT Token
      const token = generateToken(user.id);

      return {
          status: 200,
          success: true,
          message: "Login successful",
          token,
          user: { id: user.id, email: user.email },
      };
    } catch (error) {
      console.error("SignIn Error:", error);
      return { status: 500, success: false, message: "Internal Server Error" };
    }

  },

  /*** Signout User ***/
  async signout(token: string): Promise<{ status: number; success: boolean; message: string }> {
    try {
      if (!token) {
        return { status: 400, success: false, message: "Token is required" };
      }
  
      // Verify the token
      jwt.verify(token, process.env.JWT_SECRET_KEY || '');  
      return { status: 200, success: true, message: "User signed out successfully" };
    } catch (error) {
      console.error("SignOut Error:", error);
      return { status: 500, success: false, message: "Internal Server Error" };
    }
  },
};

export default authService;