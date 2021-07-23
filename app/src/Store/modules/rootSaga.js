import { all } from 'redux-saga/effects'

import app from '../modules/app/sagas'

export default function* rootSaga() {
    return yield all([app])
}