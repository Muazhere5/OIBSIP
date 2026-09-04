require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const connectDB = require('./config/dbConnection');
const userAuthRoutes = require('./routes/userAuthRoutes');

const orderRoutes = require('./routes/orderRoutes');
const configureSocket = require('./config/socketConfig');

const app = express();
const server = http.createServer(app);

connectDB();

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.use('/api/users', userAuthRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', require('./routes/adminAuthRoutes'));
app.use('/api/inventory', require('./routes/inventoryRoutes'));

require('./jobs/inventoryCronJob');

const io = configureSocket(server);
app.set('io', io);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
