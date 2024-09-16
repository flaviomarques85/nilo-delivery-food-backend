const OrdersService = require('../services/OrdersService');

exports.createOrder = async (req, res) => {
    try {
        const order = await OrdersService.createOrder(req.body);
        res.status(201).json(order);
    } catch (error) {
        console.error('Erro ao criar ordem:', error);
        res.status(400).json({ message: error.message });
    }
};

exports.getOrders = async (req, res) => {
    try {
        const orders = await OrdersService.getOrders();
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getOrderById = async (req, res) => {
    try {
        const order = await OrdersService.getOrderById(req.params.id);
        res.json(order);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.updateOrder = async (req, res) => {
    try {
        const order = await OrdersService.updateOrder(req.params.id, req.body);
        res.json(order);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

