import {GET_RECIPE, GET_RECIPES, RECIPES_LOADING} from "../actions/types";

const initialState = {
    recipe: null,
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case RECIPES_LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_RECIPE:
            return {
                ...state,
                recipe: action.payload,
                loading: false
            };
        case GET_RECIPES:
            return {
                ...state,
                recipes: action.payload,
                loading: false
            };
        default:
            return state;
    }
}