import axios from 'axios'

const rest = axios.create({
    baseURL: 'https://wls-driverx-api.herokuapp.com'
})

export default rest
