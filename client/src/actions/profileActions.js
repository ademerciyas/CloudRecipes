import axios from 'axios';
import {GET_PROFILE, PROFILE_LOADING, GET_ERRORS, CLEAR_CURRENT_PROFILE} from "./types";
import jwt_decode from "jwt-decode";


export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());
    const decoded = jwt_decode(localStorage.jwtToken);
    const id  = decoded.id;
    axios.get(`/api/users/${id}`)
        .then(res => {
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
        }).catch(err => dispatch({
        type: GET_ERRORS,
        payload: err
    }))
};

export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING
    }
};

export const clearProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    }
};