import * as actionTypes from '../actions/actionTypes'

const initialState = {
    loadingScream: false,
    postingComment: false,
    errors: null
}

export default (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.LOADING_UI:
            return {
                ...state,
                loadingScream: true
            }
            case actionTypes.SET_ERRORS:
                return {
                    ...state,
                    loadingScream: false,
                    errors: action.payload
                }
            case actionTypes.CLEAR_ERRORS:
            case actionTypes.POST_SCREAM:
                return {
                    ...state,
                    loadingScream: false,
                    errors: null 
                }
            case actionTypes.LOADING_SCREAM:
                return {
                    ...state,
                    loadingScream: true
                }
            case actionTypes.STOP_LOADING:
                return {
                    ...state,
                    loadingScream: false
                }
            case actionTypes.START_SUBMITTING:
                return {
                    postingComment: true
                }
            case actionTypes.SUBMIT_COMMENT:
                return {
                    postingComment: false
                }
        default:
            return state
    }
}