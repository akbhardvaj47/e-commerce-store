import express from 'express';
import dotenv from 'dotenv';
import dbConnect from './config/db.js';
import userRouter from './routes/userRoutes.js';
import cors from 'cors';
import adminRoute from './routes/adminRoutes.js';
import categoryRoute from './routes/categoryRoutes.js';
import productRoute from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

dotenv.config();

const app = express();

// ✅ Define allowed origins
const allowedOrigins = [
  'https://aktechmart.onrender.com',   // production
  'https://aktechstore.onrender.com' ,      
  'http://localhost:5173',  
];

// ✅ Configure CORS dynamically
app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps, curl, etc.)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// Connect to MongoDB
dbConnect();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', userRouter);
app.use('/api/auth/admin', adminRoute);
app.use('/api/category', categoryRoute);
app.use('/api/products', productRoute);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

// Example route
app.get('/', (req, res) => {
  res.send({ message: 'API is running' });
});

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
