const { connect } = require('./src/database/config');
const Ticket = require('./src/models/TicketsModel');

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return Array.from({ length }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
}

async function createTickets() {
    try {
        await connect();
        console.log('Conectado ao banco de dados');

        const tickets = new Set();
        while (tickets.size < 320) {
            tickets.add(generateRandomString(5));
        }

        const ticketPromises = Array.from(tickets).map(async (ticket) => {
            const savedTicket = await Ticket.create({
                ticket_num: ticket,
                valid: true,
                used: false
            });
            console.log(`Ticket criado: ${savedTicket.ticket_num}`);
            return savedTicket;
        });

        await Promise.all(ticketPromises);
        console.log('320 tickets foram criados e salvos com sucesso');
    } catch (error) {
        console.error('Erro ao criar tickets:', error);
    } finally {
        process.exit();
    }
}

createTickets();