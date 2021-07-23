const axios = require('axios')

const rest = axios.create({
    baseURL: 'https://maps.googleapis.com/maps/api'
})

const google_maps_api = require('../data/keys.json').google_maps_api

module.exports = {
    getPlaces: async (address) => {
        try {
            const response = await rest.get(
                `/place/autocomplete/json?input=${address}&key=${google_maps_api}`
            )

            return { error: false, data: response.data}
            
        } catch (error) {
            return { error: true, message: error.message}
            
        }
    },
    getRoute: async (origin, destination) => {
        try {
            const response = await rest.get(
                `/directions/json?origin=place_id:${origin}&destination=place_id:${destination}&key=${google_maps_api}`
            )
            return { error: false, data: response.data}
        } catch (error) {
            return { error: true, message: error.message}
        }
    }
}
