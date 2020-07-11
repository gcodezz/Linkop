import * as actionTypes from '../actions/actionTypes'

const initialState = {
    screams: [],
    scream: {},
    loading: false
}

export default (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.LOADING_DATA:
            return {
                ...state,
                loading: true
            }
        case actionTypes.SET_SCREAMS:
            return {
                ...state,
                screams: action.payload,
                loading: false
            }
        case actionTypes.LIKE_SCREAM:
        case actionTypes.UNLIKE_SCREAM:
            let index = state.screams.findIndex(
                (scream) => scream.screamId === action.payload.screamId
            )
            state.screams[index] = action.payload
            if (state.scream.screamId === action.payload.screamId) {
                state.scream = {
                    ...state.scream,
                    ...action.payload
                }
            }
            return {
                ...state,
            }
        case actionTypes.DELETE_SCREAM:
            let arrIndex = state.screams.findIndex(scream => scream.screamId === action.payload)
            state.screams.splice(arrIndex, 1)
            return {
                ...state
            }
        case actionTypes.POST_SCREAM:
            return {
                ...state,
                screams: [
                    action.payload,
                    ...state.screams
                ]
            }
        case actionTypes.SET_SCREAM:
            return {
                ...state,
                scream: action.payload
            }
        case actionTypes.SUBMIT_COMMENT:
            const screamIndex = state.screams.findIndex(scream => scream.screamId === action.payload.screamId)
            // console.log(screamIndex)
            state.screams[screamIndex].commentCount++
            return {
                ...state,
                ...state.scream.commentCount++,
                scream: {
                    ...state.scream,
                    comments: [
                        action.payload,
                        ...state.scream.comments
                    ]
                }
            }
        default:
            return state
    }
}