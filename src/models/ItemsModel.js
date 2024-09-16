const mongoose = require('mongoose')
const itemSchema = new mongoose.Schema({
    item_name: {
        type: String,
        required: [true, 'Nome do item é obrigatório'],
        trim: true,
        maxlength: [100, 'Nome do item não pode ter mais de 100 caracteres']
    },
    quantity: {
        type: Number,
        required: [true, 'Quantidade é obrigatória'],
        min: [1, 'Quantidade deve ser pelo menos 1']
    },
    ticket_num: {
        type: String,
        required: [true, 'Número do ticket é obrigatório'],
        trim: true,
        match: [/^[A-Z0-9]{5}$/, 'Número do ticket deve ter 6 caracteres alfanuméricos maiúsculos']
    }
}, { timestamps: true });

const Item = mongoose.model('items', itemSchema);

module.exports = { Item }