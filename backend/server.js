import express from 'express';
import dotenv from 'dotenv';
import dbConnect from './config/db.js'; // adjust path as needed
import userRouter from './routes/userRoutes.js';
import cors from 'cors';
import adminRoute from './routes/adminRoutes.js';
import categoryRoute from './routes/categoryRoutes.js';
import productRoute from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
dotenv.config();

const app = express();
app.use(cors());

// Connect to MongoDB
dbConnect();

// Middleware
app.use(express.json());
app.use('/api/auth',userRouter)
app.use('/api/auth/admin',adminRoute)
app.use('/api/category', categoryRoute)
app.use('/api/products', productRoute)
app.use('/api/cart', cartRoutes)
app.use('/api/orders', orderRoutes)

// Example route
app.get('/', (req, res) => {
    res.send({ message: 'API is running' });
});

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
import path from "path";
import { fileURLToPath } from "url";

// Ye lines top ke imports ke niche likho
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve frontend build
const frontendPath = path.resolve(__dirname, "../frontend/dist");
app.use(express.static(frontendPath));

// React Router fallback (important)
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});
