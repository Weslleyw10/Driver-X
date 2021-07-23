import OAuthManager from 'react-native-social-login'

const social = new OAuthManager('driverx')

social.configure({
    facebook: {
        client_id: '338940254395823',
        client_secret: '2c1d991dc949b82430e780a5575eac7e'
    }
})

export default social