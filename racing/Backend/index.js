import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './routes/routes.js';

// Constants
const PORT = process.env.PORT || 3001;
const ENV = process.env.NODE_ENV || 'production';
const DB_CONNECT = process.env.DB_CONNECT || 'mongodb://localhost:27017/racingDB';

// Initialize Express
const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000'
}));

// Connect to MongoDB and start the server
mongoose.connect(DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true, socketTimeoutMS: 360000 })
  .then(() => console.info(`MongoDB connected`))
  .catch(err => console.error('Mongo Connection Error', err));

// Routes
app.use(router);

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${ENV} environment`);
});

export { app as default, server };



