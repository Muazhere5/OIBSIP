require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/dbConnection');
const userAuthRoutes = require('./routes/userAuthRoutes');

const orderRoutes = require('./routes/orderRoutes');

const app = express();

connectDB();

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.use('/api/users', userAuthRoutes);
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
