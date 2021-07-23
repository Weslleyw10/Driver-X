const axios = require("axios")
const keys = require('../data/keys.json')

const rest = axios.create({
    baseURL: 'https://api.pagar.me/1'
})

const api_key = keys.api_key;

module.exports = {
    createRecipient: async (data) => {
        try {
            const response = await rest.post('/recipients', {
                api_key,
                automatic_anticipation_enabled: "true",
                bank_account: {
                    agencia: "0932",
                    agencia_dv: "5",
                    conta: "58054",
                    bank_code: "341",
                    type: "conta_corrente",
                    conta_dv: "1",
                    document_number: "26268738888",
                    legal_name: data.name
                },
                transfer_day: "5",
                transfer_enabled: "true",
                transfer_interval: "weekly",
            })

            return {
                error: false,
                data: response.data
            }

        } catch (error) {
            return { error: true, message: error.message }
        }
    },
    createCreditCard: async (data) => {
        try {
            const response = await rest.post('/cards', {
                api_key,
                ...data
            })

            return {
                error: false,
                data: response.data
            }
            
        } catch (error) {
            return { error: true, message: error.message}
        }
    }
}