import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { setupSwagger } from "./doc/swaggerConfig";
import transactionRoutes from './routes/transactionRoutes';

// Middleware
const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true,
    optionsSuccessStatus: 200
}));
app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100 // limit each IP to 100 requests per windowMs   
}));
// Swagger Docs
setupSwagger(app);
// Routes
app.use('/api/transactions', transactionRoutes);

// Route that throws NotFoundError
app.all('*', async (req, res, next) => {
    try {
      res.status(400).json({ message: 'Resource not found' });
      return;
    } catch (error) {
      // Default error handler (for any other errors)
      res.status(500).json({ message: 'Internal Server Error' });
      return;
    }
});

export { app };
