const express = require("express")
const router = express.Router()
const mongoose = require('mongoose')
const pagarme = require('../services/pagarme')
const googleMaps = require('../services/googleMaps')

//models
const User = require('../models/user')
const Car = require('../models/car')
const PaymentMethod = require('../models/paymentMethod')


router.post('/signup', async (req, res) => {
    const transactionDB = mongoose.connection
    const session = await transactionDB.startSession()
    session.startTransaction()

    try {
        const { user, car, paymentMethod } = req.body
        let finalUser = ''

        if (user.type === 'M') {
            // register recipient
            const createRecipient = await pagarme.createRecipient({
                name: user.name,
                email: user.email
            })

            if (createRecipient.errors) {
                throw createRecipient.errors.message
            }

            // register driver
            finalUser = await new User({
                ...user,
                recipientId: createRecipient.data.id
            }).save({ session })

            // register car
            const carObj = await new Car({
                ...car,
                userId: finalUser._id
            }).save({ session })



        } else {
            // create credit card in pagarme
            const createCreditCard = await pagarme.createCreditCard({
                card_expiration_date: paymentMethod.card_expiration_date.replace(/[^\d]+/g, ''),
                card_number: paymentMethod.card_number.replace(/[^\d]+/g, ''),
                card_cvv: paymentMethod.card_cvv,
                card_holder_name: paymentMethod.card_holder_name
            })

            // error pagarme
            if (createCreditCard.errors) {
                throw createRecipient.errors.message
            }

            // register passenger
            finalUser = await new User(user).save({ session })

            // register credit card
            await new PaymentMethod({
                cardId: createCreditCard.data.id,
                userId: finalUser._id
            }).save({ session })
        }

        await session.commitTransaction()
        session.endSession()

        res.json({
            error: false
        })

    } catch (error) {
        await session.abortTransaction()
        session.endSession()
        res.json({ error: true, message: error.message })
    }

})

router.post('/check-user', async (req, res) => {
    try {
        const email = req.body.email
        const user = await User.findOne({
            email
        })

        res.json({ error: false, user })

    } catch (error) {
        res.json({ error: true, message: error.message })
    }
})

router.put('/location/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { coordinates } = req.body

        await User.findByIdAndUpdate(id, {
            location: {
                type: 'Point',
                coordinates
            }
        })

        res.json({ error: false })

    } catch (error) {
        res.json({ error: true, message: error.message })
    }
})

router.put('/socket/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { socketId } = req.body

        const user = await User.findByIdAndUpdate(id, {
            socketId
        })

        res.json({ error: false })
        
    } catch (error) {
        res.json({ error: true, message: error.message })
    }
})

router.get('/address/:address', async (req, res) => {
    try {
        const list = await googleMaps.getPlaces(
            encodeURIComponent(req.params.address)
        )

        if(list.error) {
            throw list.message
        }

        const addressList = list.data.predictions.map(address => {
            const {
                place_id,
                description,
                structured_formatting: { secondary_text }
            } = address

            return { place_id, description, secondary_text }
        })

        res.json({ error: false, addressList})
        
    } catch (error) {
        res.json({ error: true, message: error.message })
    }
})

router.get('/pre-ride', async (req, res) => {
    try {
        const { origin, destination } = req.body
        const routeRequest = await googleMaps.getRoute(origin, destination)

        if (routeRequest.error) {
            throw routeRequest.message
        }

        const {
            distance,
            duration,
            start_address,
            end_address,
            steps
        } = routeRequest.data.routes[0].legs[0]

        const route = steps.map((step, index) => {
            return [
                {
                    point: "origin",
                    step: index,
                    latitude: step.start_location.lat,
                    longitude: step.start_location.lng,
                },
                {
                    point: "destination",
                    step: index,
                    latitude: step.end_location.lat,
                    longitude: step.end_location.lng,
                }
            ]
        }).flat(1)

        const priceRide = ((distance.value / 1000) * 2.67).toFixed(2)

        res.json({ error: false, distance, duration, priceRide, start_address, end_address, route})
        
    } catch (error) {
        res.json({ error: true, message: error.message })
        
    }
})




module.exports = router