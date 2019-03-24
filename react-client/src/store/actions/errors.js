import {ADD_ERROR, REMOVE_ERROR} from "../actionTypes";

// These functions are called action creators.
export const addError = error => ({
    type: ADD_ERROR,
    error
});

export const removeError = () => ({
    type: REMOVE_ERROR,
});