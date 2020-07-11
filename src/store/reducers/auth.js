import * as actionTypes from '../actions/actionTypes'

const initialState = {
    token: null,
    userId: null,
    errors: {},
    loading: false
}

export default (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return {
                ...state,
                errors: {},
                loading: true
            }
        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                userId: null,
                token: null
            }
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                token: action.token,
                userId: action.userId,
                errors: {},
                loading: false
            }
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                errors: action.error,
                loading: false
            }
        default:
            return state
    }
}

