import axios from 'axios';
import jwtDecode from 'jwt-decode'

import * as actionTypes from './actionTypes';
import { getUserData } from './user'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('FBIdToken');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
}

export const login = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        const userData = {
            email: email,
            password: password
        };
        axios.post('/login', userData)
            .then(res => {
                const decodedToken = jwtDecode(res.data.token)
                const expirationDate = decodedToken.exp * 1000
                const FBIdToken = `Bearer ${res.data.token}`
                localStorage.setItem('FBIdToken', FBIdToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', decodedToken.user_id);
                axios.defaults.headers.common['Authorization'] = FBIdToken
                dispatch(authSuccess(res.data.token, decodedToken.user_id));
                dispatch(checkAuthTimeout(decodedToken.exp));
                dispatch(getUserData())
            })
            .catch(err => {
                console.log(err.response.data)
                dispatch(authFail(err.response.data));
            });
    };
};

export const signup = (email, password, confirmPassword, handle) => {
    return dispatch => {
        dispatch(authStart())
        const userData = {
            email: email,
            password: password,
            confirmPassword: confirmPassword,
            handle: handle
        }
        axios.post('/signup', userData)
            .then(res => {
                const decodedToken = jwtDecode(res.data.token)
                const expirationDate = decodedToken.exp * 1000
                const FBIdToken = `Bearer ${res.data.token}`
                localStorage.setItem('FBIdToken', FBIdToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', decodedToken.user_id);
                axios.defaults.headers.common['Authorization'] = FBIdToken
                dispatch(authSuccess(res.data.token, decodedToken.user_id));
                dispatch(checkAuthTimeout(decodedToken.exp));
                dispatch(getUserData())
            })
            .catch(err => {
                dispatch(authFail(err.response.data));
            });
    }
}

export const authCheckState = () => {
    return dispatch => {
        axios.defaults.headers.common['Authorization'] = localStorage.FBIdToken
        const token = axios.defaults.headers.common['Authorization']
        if (!token) {
            dispatch(logout());
        } else {
            let expirationDate = localStorage.getItem('expirationDate');
            expirationDate = new Date(parseInt(expirationDate))
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout(expirationDate.getTime()/1000));
                dispatch(getUserData())
            }   
        }
    };
};