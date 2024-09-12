// Import any required models here
const Ticket = require('../models/TicketsModel.js');
const logger = require('../utils/logger');

// Define your service methods
exports.getTickets = async () => {
    logger.info('Getting all tickets');
    return await Ticket.find();

};

exports.getTicketByTicketNum = async (ticket_num) => {
    return await Ticket.findOne(ticket_num);
};

exports.createTicket = async (body) => {
    const ticket = new Ticket(body);
    return await ticket.save();
};

exports.updateTicket = async (ticket_num, body) => {
    return await Ticket.findOneAndUpdate(ticket_num, body, { new: true });
};

exports.deleteTicket = async (ticket_num) => {
    return await Ticket.findOneAndDelete(ticket_num);
};