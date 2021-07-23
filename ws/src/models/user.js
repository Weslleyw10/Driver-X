const mongoose = require('mongoose')
const Schema = mongoose.Schema

const generate = require('gerador-validador-cpf').generate

const user = new Schema({
    fbId: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String },
    cpf: { 
        type: String,
        default: () => {
            return generate()
        }
    },
    type: { 
        type: String,
        enum: ['M', 'P'],
        required: true
    },
    accessToken: { type: String, required: true },
    recipientId: {
        type: String,
        required: function () {
            return this.type === 'M'
        }
    },
    location: {
        type: { type: String},
        coordinates: []
    },
    socketId: String,
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: null
    },
})

user.index({ location: '2dsphere' })

module.exports = mongoose.model('User', user)