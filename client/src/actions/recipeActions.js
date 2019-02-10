import axios from 'axios';
import {GET_ERRORS} from "./types";

export const createRecipe = (recipeData, history) => dispatch => {
    axios.post(`/api/recipes/`, recipeData)
        .then(res => {
            if (res.status === 200) {
                history.push('/dashboard')
            }
        }).catch(err => {
            console.log(err);
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    })
};
