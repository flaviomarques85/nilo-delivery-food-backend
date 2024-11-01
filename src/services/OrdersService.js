const { Order } = require('../models/OrdersModel');
const { Item } = require('../models/ItemsModel');
const { Ticket } = require('../models/TicketsModel');
const mongoose = require('mongoose');
const logger = require('../utils/logger');

exports.createOrder = async (orderData) => {
    let session;
    try {
        session = await mongoose.startSession();
        session.startTransaction();

        // Verificar se todos os ticket_num são iguais
        const ticketNums = orderData.items.map(item => item.ticket_num);
        const uniqueTicketNums = new Set(ticketNums);

        if (ticketNums.length > 1 && uniqueTicketNums.size == 1) {
            throw new Error('Voce nao pode usar o mesmo numero de ticket para dois ou mais alimentos');
        }

        // Criar os itens primeiro
        const itemPromises = orderData.items.map(item =>
            new Item(item).save({ session })
        );
        const savedItems = await Promise.all(itemPromises);

        // Obter os IDs dos itens salvos
        const itemIds = savedItems.map(item => item._id);

        // Criar a ordem com os IDs dos itens
        const order = new Order({
            order_number: orderData.order_number,
            order_status: orderData.order_status,
            items: itemIds,
        });

        await order.save({ session });

        // Atualizar os tickets como utilizados
        const updateTicketPromises = ticketNums.map(ticket_num =>
            Ticket.findOneAndUpdate(
                { ticket_num },
                { used: true },
                { session }
            )
        );

        const updatedTickets = await Promise.all(updateTicketPromises);

        // Verificar se todos os tickets foram encontrados e atualizados
        const notFoundTickets = updatedTickets.filter(ticket => !ticket);
        if (notFoundTickets.length > 0) {
            throw new Error('Alguns tickets não foram encontrados no sistema');
        }

        await session.commitTransaction();
        logger.info(`Pedido ${order.order_number} criado e tickets marcados como utilizados`);
        return order;
    } catch (error) {
        logger.error('Erro ao criar ordem:', error);
        if (session) {
            try {
                await session.abortTransaction();
            } catch (abortError) {
                logger.error('Erro ao abortar transação:', abortError);
            }
        }
        throw error;
    } finally {
        if (session) {
            session.endSession();
        }
    }
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

exports.deleteOrder = async (id) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Encontrar a ordem
        const order = await Order.findById(id).session(session);
        if (!order) {
            await session.abortTransaction();
            logger.warn(`Pedido ${id} não encontrado para exclusão`);
            return { status: 404, message: 'Pedido não encontrado' };
        }

        // Deletar todos os itens relacionados
        await Item.deleteMany({ _id: { $in: order.items } }).session(session);

        // Deletar a ordem
        await Order.findByIdAndDelete(id).session(session);

        await session.commitTransaction();
        logger.info(`Pedido ${id} e seus itens relacionados foram deletados com sucesso`);
        return { status: 200, message: 'Pedido e itens relacionados deletados com sucesso' };
    } catch (error) {
        await session.abortTransaction();
        logger.error(`Erro ao deletar o pedido ${id}:`, error);
        throw error;
    } finally {
        session.endSession();
    }
};
