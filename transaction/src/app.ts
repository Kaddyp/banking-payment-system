import express from 'express';
import cors from 'cors';
import { setupSwagger } from "./doc/swaggerConfig";
import transactionRoutes from './routes/transactionRoutes';

// Middleware
const app = express();
app.use(express.json());
app.use(cors({
    origin: '', 
    credentials: true,
    optionsSuccessStatus: 200
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
