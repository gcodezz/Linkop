import axios from 'axios'

import * as actionTypes from './actionTypes'

export const getUserData = () => {
    return dispatch => {
        dispatch({
            type: actionTypes.LOADING_USER,
        })
        axios
            .get('/user')
            .then((res) => {
                dispatch({
                    type: actionTypes.SET_USER,
                    payload: res.data
                })
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const markNotificationRead = (notificationIds) => {
    return dispatch => {
        axios.post('/notifications', notificationIds)
            .then(res => {
                dispatch({
                    type: actionTypes.MARK_NOTIFICATIONS_READ,
                })
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const imageUploadFail = (error) => {
    return {
        type: actionTypes.IMAGE_UPLOAD_ERROR,
        error: error
    }
}

export const uploadImage = (formData) => {
    return dispatch => {
        dispatch({
            type: actionTypes.LOADING_USER
        })
        axios.post('/user/image', formData)
            .then(() => {
                dispatch(getUserData())
            })
            .catch(err => {
                dispatch(imageUploadFail(err.response.data.error))
                //console.log(err.response.data)
            })
    }
}

export const updateUserDetails = (userDetails) => {
    return dispatch => {
        dispatch({
            type: actionTypes.LOADING_USER
        })
        axios.post('/user', userDetails)
            .then(() => {
                dispatch(getUserData())
            })
            .catch((err) => {
                console.log(err.response.data)
            })
    }
}