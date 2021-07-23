const moongose = require('mongoose')
const Schema = moongose.Schema

const ride = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    driverId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    info: {
        type: Object,
        required: true
    },
    status: {
        type: String,
        enum: ['A', 'C', 'F'], // active, canceled, finished
        default: 'A'
    },
    transactionId: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: null
    },


})

module.exports = moongose.model('Ride', ride)