import produce from 'immer'
import types from './types'

const INITIAL_STATE = {
    user: {
        fbId: null,
        name: null,
        email: null,
        type: 'M',
        accessToken: null,
    }
}

function app(state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.UPDATE_USER:
            return produce(state, (draft) => {
                draft.user = { 
                    ...state.user, 
                    ...action.user 
                };

                console.log('ACTIONUSER', action.user)


            });

        default:
            console.log('INITIAL STATE', INITIAL_STATE)
            return state

    }


}

export default app
