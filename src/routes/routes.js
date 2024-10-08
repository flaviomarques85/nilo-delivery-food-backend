const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/TicketsController');

router.get('/', ticketController.getTickets)
router.get('/:ticket_num', ticketController.getTicketByTicketNum)
router.post('/', ticketController.createTicket)
router.post('/:ticket_num', ticketController.updateTicket)

module.exports = router;