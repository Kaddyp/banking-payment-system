import express from 'express';
import cors from 'cors';
import { setupSwagger } from "./doc/swaggerConfig";
import authRoutes from './routes/authRoutes';

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
app.use('/api/auth', authRoutes);

export { app };
