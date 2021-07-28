import { all, takeLatest, select, call, put } from 'redux-saga/effects'
import AsyncStorage from '@react-native-async-storage/async-storage'
import types from './types'
import rest from '../../../Services/rest'
import { navigate } from '../../../Routes/rootNavigation'
import { 
    updateUser, 
    createUser as createUserAction,
    updateRide as updateRideAction

} from './actions'

export function* singIn() {
    try {
        const { user } = yield select((state) => state.app)
        const {data: res } = yield call(rest.post, '/check-user', {email: user.email})

        if (res.error) {
            alert(res.message)
            return false
        }

        if (res.user) {
            yield put(updateUser(res.user))
            yield call(AsyncStorage.setItem, '@driverx/user', JSON.stringify(res.user));
            navigate('Home')
        } else {
            navigate('Type')
        }

    } catch (error) {
        alert(error.message)
    }

}

export function* createUser() {
    try {
        const { user, car, paymentMethod } = yield select(state => state.app)
        const { data: res } = yield call(rest.post, '/signup', { car, user, paymentMethod })

        if(res.error) {
            alert(res.message)
            return false
        }

        yield put(updateUser(res.user))
        yield call(AsyncStorage.setItem,'@driverx/user', JSON.stringify(res.user))
        navigate('Home')

        
    } catch (error) {
        alert(error.message)
    }
}

export function* rideInfos({ origin, destination }) {
    try {
        const {data: res} = yield call(rest.post, '/pre-ride', { origin, destination })

        if(res.error) {
            alert(res.message)
            return false
        }

        yield put(updateRideAction({info: res.info}))
        navigate('Home')

    } catch (error) {
        alert(error.message)
    }
}


export default all([
    takeLatest(types.USER_SIGNIN, singIn),
    takeLatest(types.USER_CREATE, createUser),
    takeLatest(types.RIDE_INFOS, rideInfos),
])