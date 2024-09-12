// Import any required services or models here
const ticketService = require('../services/TicketsService');

exports.getTickets = async (req, res) => {
    try {
        const tickets = await ticketService.getTickets();
        res.json(tickets);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getTicketByTicketNum = async (req, res) => {
    try {
        const ticket = await ticketService.getTicketByTicketNum({ ticket_num: req.params.ticket_num })
        if (!ticket) {
            return res.status(404).json({ error: 'Ticket not found' });
        }
        res.json(ticket);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.createTicket = async (req, res) => {
    try {
        const { name } = req.body;
        const newTicket = await ticketService.createTicket(req.body);
        res.json(newTicket);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.updateTicket = async (req, res) => {
    try {
        const ticket = await ticketService.updateTicket(req.params.ticket_num, req.body);
        if (!ticket) {
            return res.status(404).json({ error: 'Ticket not found' });
        }
        res.json(ticket);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
    }
};

exports.deleteTicket = async (req, res) => {
    try {
        const ticket = await ticketService.deleteTicket(req.params.ticket_num);
        if (!ticket) {
            return res.status(404).json({ error: 'Ticket not found' })
        }
        res.json(ticket);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
    }
};