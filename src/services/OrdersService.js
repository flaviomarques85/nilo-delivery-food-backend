const { Order } = require('../models/OrdersModel');
const { Item } = require('../models/ItemsModel');
const mongoose = require('mongoose');

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

        await session.commitTransaction();
        return order;
    } catch (error) {
        console.error('Erro ao criar ordem:', error);
        if (session) {
            try {
                await session.abortTransaction();
            } catch (abortError) {
                console.error('Erro ao abortar transação:', abortError);
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
