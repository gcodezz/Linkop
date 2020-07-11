import axios from 'axios'

import * as actionTypes from './actionTypes'

export const getScreams = () => {
    return dispatch => {
        dispatch({
            type: actionTypes.LOADING_DATA
        })
        axios.get('/screams')
            .then(res => {
                dispatch({
                    type: actionTypes.SET_SCREAMS,
                    payload: res.data
                })
            })
            .catch(err => {
                //console.log('4')
                dispatch({
                    type: actionTypes.SET_SCREAMS,
                    payload: []
                })
            })
    }
}

export const getScream = (screamId) => {
    return dispatch => {
        dispatch({
            type: actionTypes.LOADING_UI,
        })
        axios.get(`/scream/${screamId}`)
            .then(res => {
                //console.log(res.data)
                dispatch({
                    type: actionTypes.SET_SCREAM,
                    payload: res.data
                })
                dispatch({
                    type: actionTypes.STOP_LOADING,
                })
            })
            .catch(err => {
                console.log(err.response.data)
            })
    }
}

export const postScream = (scream) => {
    const screamBody = {
        body: scream
    }
    return dispatch => {
        dispatch({
            type: actionTypes.LOADING_UI
        })
        axios.post('/scream', screamBody)
            .then(res => {
                dispatch({
                    type: actionTypes.POST_SCREAM,
                    payload: res.data
                })
                dispatch({
                    type: actionTypes.CLEAR_ERRORS
                })
            })
            .catch(err => {
                dispatch({
                    type: actionTypes.SET_ERRORS,
                    payload: err.response.data
                })
            })
    }
}

export const likeScream = (screamId) => {
    return dispatch => {
        axios.get(`/scream/${screamId}/like`)
            .then(res => {
                dispatch({
                    type: actionTypes.LIKE_SCREAM,
                    payload: res.data
                })
            })
            .catch(err => {
                console.log(err.response)
            })
    }
}

export const unlikeScream = (screamId) => {
    return dispatch => {
        axios.get(`/scream/${screamId}/unlike`)
            .then(res => {
                dispatch({
                    type: actionTypes.UNLIKE_SCREAM,
                    payload: res.data
                })
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const submitComment = (screamId, comment) => {
    const commentData = {
        body: comment
    }
    return dispatch => {
        dispatch({
            type: actionTypes.START_SUBMITTING
        })
        axios.post(`/scream/${screamId}/comment`, commentData)
            .then(res => {
                dispatch({
                    type: actionTypes.SUBMIT_COMMENT,
                    payload: res.data
                })
                dispatch(clearErrors())
            })
            .catch(err => {
                dispatch({
                    type: actionTypes.SET_ERRORS,
                    payload: err.response
                })
            })
    }
}

export const deleteScream = (screamId) => {
    return dispatch => {
        axios.delete(`/scream/${screamId}`)
            .then(() => {
                dispatch({
                    type: actionTypes.DELETE_SCREAM,
                    payload: screamId
                })
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const getUserData = (userHandle) => {
    return dispatch => {
        axios.get(`/user/${userHandle}`)
            .then(res => {
                dispatch({
                    type: actionTypes.SET_SCREAMS,
                    payload: res.data.screams
                })
            })
            .catch(() => {
                dispatch({
                    type: actionTypes.SET_SCREAMS,
                    payload: null
                })
            })
    }
}

export const clearErrors = () => {
    return dispatch => {
        dispatch({
            type: actionTypes.CLEAR_ERRORS
        })
    }
}