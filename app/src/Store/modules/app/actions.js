import types from './types'

export function updateUser(user) {
    return {
        type: types.USER_UPDATE,
        user
    }
}

export function createUser() {
    return {
        type: types.USER_CREATE
    }
}

export function signinUser() {
    return {
        type: types.USER_SIGNIN
    }
}

export function updateCar(car) {
    return {
        type: types.CAR_UPDATE,
        car
    }
}

export function paymentMethodUpdate(paymentMethod) {
    return {
        type: types.PAYMENT_UPDATE,
        paymentMethod
    }
}

export function rideInfos(origin, destination) {
    return {
        type: types.RIDE_INFOS,
        origin,
        destination
    }
}

export function updateRide(ride) {
    return {
        type: types.RIDE_UPDATE,
        ride
    }
}