const express = require('express');
const cors = require('cors');
const { connect } = require('./database/config');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

//Routes
const healthcheckRoutes = require('./routes/healthcheck ')
const ticketRoutes = require('./routes/routes')
const ordersRoutes = require('./routes/orders')
app.use('/api/healthcheck', healthcheckRoutes)
app.use('/api/ticket', ticketRoutes)
app.use('/api/orders', ordersRoutes)

// Connect to MongoDB
connect();
// Start the server
app.listen(3001, () => {
    console.log(`Application is running on port 3001`);
});