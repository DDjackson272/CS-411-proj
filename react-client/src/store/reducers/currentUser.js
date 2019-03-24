import {SET_CURRENT_USER} from "../actionTypes";

const DEFAULT_STATE = {
    isAuthenticated: false, // hopefully be true when user logged in
    user: [] // all user information when logged in
};

export default (state=DEFAULT_STATE, action) => {
    switch(action.type) {
        case SET_CURRENT_USER:
            return {
                // tricky here, add !! to ensure boolean instead of possible undefined
                isAuthenticated: !!Object.keys(action.user).length,
                user: action.user
            };
        default:
            return state;
    }
}