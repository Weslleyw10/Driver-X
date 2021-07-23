const moongose = require('mongoose')
const Schema = moongose.Schema

const paymentMethod = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    cardId: { type: String, required: true },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: null
    },
    
})

module.exports = moongose.model('PaymentMethod', paymentMethod)