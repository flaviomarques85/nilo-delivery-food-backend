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
    // Validação dos campos used e valid
    if ('used' in body && typeof body.used !== 'boolean') {
        logger.error('Campo "used" deve ser um booleano');
        throw new Error('Campo "used" deve ser um booleano');
    }

    if ('valid' in body && typeof body.valid !== 'boolean') {
        logger.error('Campo "valid" deve ser um booleano');
        throw new Error('Campo "valid" deve ser um booleano');
    }

    // Se a validação passar, atualiza o ticket
    const updatedTicket = await Ticket.findOneAndUpdate(
        { ticket_num: ticket_num },
        body,
        { new: true }
    );

    if (!updatedTicket) {
        logger.error(`Ticket não encontrado: ${ticket_num}`);
        throw new Error('Ticket não encontrado');
    }

    logger.info(`Ticket atualizado: ${ticket_num}`);
    return updatedTicket;
};

exports.deleteTicket = async (ticket_num) => {
    return await Ticket.findOneAndDelete(ticket_num);
};