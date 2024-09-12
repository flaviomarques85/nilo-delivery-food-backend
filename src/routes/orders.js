const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/OrdersController');

router.post('/', ordersController.createOrder);
router.get('/', ordersController.getOrders);
router.get('/:id', ordersController.getOrderById);
router.put('/:id', ordersController.updateOrder);

module.exports = router;
