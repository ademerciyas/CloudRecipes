import {GET_ERRORS, SET_CURRENT_USER} from './types';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from "../utils/setAuthToken";

//Register User
export const registerUser = (userData, history) => dispatch => {
    axios.post('/api/users', userData)
        .then(res => {
            history.push('/login')
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }))
};

//Login user - Get token
export const loginUser = (userData) => dispatch => {
    axios.post('/auth/signin', userData)
        .then(res => {
            const {token} = res.data;
            localStorage.setItem('jwtToken', 'Bearer ' + token);
            setAuthToken(token);
            const decoded = jwt_decode(token);
            dispatch(setCurrentUser(decoded));
        })
        .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
            }
        )
};

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
};

//Log user out
export const logoutUser = () => dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
};