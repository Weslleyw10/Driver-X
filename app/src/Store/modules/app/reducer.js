import produce from 'immer'
import types from './types'

const INITIAL_STATE = {
    user: {
        fbId: null,
        name: null,
        email: null,
        type: 'M',
        accessToken: null,
    },
    car: {
        licensePlate: '',
        brand: '',
        model: '',
        color: ''
    },
    paymentMethod: {
        card_expiration_date: '',
        card_number: '',
        card_cvv: '',
        card_holder_name: '',
    },
    ride: null
}

function app(state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.USER_UPDATE:
            return produce(state, (draft) => {
                draft.user = {
                    ...state.user,
                    ...action.user
                };
            });
        
        case types.CAR_UPDATE:
            return produce(state, (draft) => {
                draft.car = {
                    ...state.car,
                    ...action.car
                }
            })

        case types.PAYMENT_UPDATE:
            return produce(state, (draft) => {
                draft.paymentMethod = {
                    ...state.paymentMethod,
                    ...action.paymentMethod
                }
            })
        
            
        case types.RIDE_UPDATE:
            return produce(state, (draft) => {
                draft.ride = {
                    ...state.ride,
                    ...action.ride
                }
            })

        default:
            return state

    }r


}

export default app
