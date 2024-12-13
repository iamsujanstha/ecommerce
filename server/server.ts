import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRouter from './routes/auth.routes'
import { authMiddleware } from './controllers/auth/auth-controller';
import adminProductRouter from './routes/admin/products.routes';

mongoose.connect('mongodb+srv://tlsujankco:iamsujan08@cluster0.ie99k.mongodb.net/').then(() => console.log("MongoDB connected!!")).catch((error) => console.log(error))

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Cache-Control',
      'Expires',
      'Pragma'
    ],
    credentials: true
  })
)

app.use(cookieParser());
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/admin/products/', adminProductRouter)

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))