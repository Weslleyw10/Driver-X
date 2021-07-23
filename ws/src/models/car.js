const moongose = require('mongoose')
const Schema = moongose.Schema

const car = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    licensePlate: { type: String, required: true },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    color: { type: String, required: true },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: null
    },

})

module.exports = moongose.model('Car', car)