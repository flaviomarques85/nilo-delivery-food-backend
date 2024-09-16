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




const Ticket = mongoose.model('food_tickets', ticketSchema);

module.exports = Ticket;