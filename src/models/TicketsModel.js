const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    ticket_num: {
        type: String,
        required: true
    },
    valid: {
        type: String,
        required: true
    },
    used: {
        type: String,
        required: true
    },
}, { timestamps: true });

const itemSchema = new mongoose.Schema({
    item_name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    ticket_num: {
        type: String,
        required: true
    },
}, { timestamps: true });

const orderSchema = new mongoose.Schema({
    order_number: {
        type: String,
        required: true
    },
    order_status: {
        type: String,
        required: true
    },
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'items'
    }]
}, { timestamps: true });

const Item = mongoose.model('items', itemSchema);
const Order = mongoose.model('orders', orderSchema);
const Ticket = mongoose.model('food_tickets', ticketSchema);

module.exports = { Ticket, Order, Item };