const { Order } = require('../models/TicketsModel');

exports.createOrder = async (order) => {
    const newOrder = new Order(order);
    return await newOrder.save();
};
exports.getOrders = async () => {
    return await Order.find().populate('items');
};
exports.getOrderById = async (id) => {
    return await Order.findOne({ order_number: id }).populate('items');
};
exports.updateOrder = async (id, order) => {
    return await Order.findByIdAndUpdate(id, order);
};