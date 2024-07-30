import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';
import userRouter from './routers/User.router.js';
import chatRouter from './routers/Chat.router.js';
import cookieParser from 'cookie-parser';

const PORT = process.env.PORT || 5000;
const app = express();

// CORS configuration
const corsOptions = {
  origin: ['http://localhost:8100','*'], // Allow all domains (replace with specific domains for production)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow headers
  credentials: true, // Allow cookies to be sent and received
};

app.use(cors(corsOptions));
app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Middleware to parse cookies

// Handle preflight requests
app.options('*', cors(corsOptions));

mongoose.connect(process.env.MONGODB_URL);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB Atlas');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

// Use the routers
app.use('/users', userRouter);
app.use('/chats', chatRouter);
