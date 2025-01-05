import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRouter from './routes/auth.routes'
import { authMiddleware } from './controllers/auth/auth-controller';
import adminProductRouter from './routes/admin/products.routes';
import showProductRouter from './routes/shop/products.routes';
import cartRouter from './routes/shop/cart.routes';
import {MONGO_URL} from './config/config'
import dotenv from "dotenv";

// mongoose.connect('mongodb+srv://tlsujankco:iamsujan08@cluster0.ie99k.mongodb.net/').then(() => console.log("MongoDB connected!!")).catch((error) => console.log(error))

dotenv.config();

const connectWithRetry = () => {
  console.log('Attempting to connect to MongoDB...');
  mongoose
    .connect(MONGO_URL)
    .then(() => console.log('Database connected!!'))
    .catch((err) => {
      console.error(`MongoDB connection error: ${err.message}`);
      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();

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
app.use('/api/admin/products/', adminProductRouter);
app.use('/api/shop/products/', showProductRouter);
app.use('/api/shop/cart/', cartRouter)

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))