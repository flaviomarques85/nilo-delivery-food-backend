const mongoose = require('mongoose')

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


const Order = mongoose.model('orders', orderSchema);

module.exports = { Order }