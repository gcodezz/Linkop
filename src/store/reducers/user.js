import * as actionTypes from '../actions/actionTypes'

const initialState = {
    credentials: {},
    likes: [],
    notifications: [],
    error: null,
    loading: false,
}

export default function(state = initialState, action) {
    switch(action.type) {
        case actionTypes.SET_USER:
            return {
                ...action.payload,
                error: null,
                loading: false
            }
        case actionTypes.LOADING_USER:
            return {
                ...state,
                error: null,
                loading: true
            }
        case actionTypes.IMAGE_UPLOAD_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case actionTypes.LIKE_SCREAM:
            return {
                ...state,
                likes: [
                    ...state.likes,
                    {
                        userHandle: state.credentials.handle,
                        screamId: action.payload.screamId
                    }
                ]
            }
        case actionTypes.UNLIKE_SCREAM:
            return {
                ...state,
                likes: state.likes.filter(
                    (like) => like.screamId !== action.payload.screamId
                )
            }
        case actionTypes.MARK_NOTIFICATIONS_READ:
            state.notifications.forEach(not => not.read = true)
            return {
                ...state
            }
        default:
            return state
    }
}