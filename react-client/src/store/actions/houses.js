import {apiCall} from "../../services/api";
import {addError} from "./errors";
import {LOAD_HOUSING, REMOVE_HOUSING} from "../actionTypes";

export const loadHousing = housings => ({
    type: LOAD_HOUSING,
    housings
});

export const fetchHousings = () => {
    return dispatch => {
        return apiCall("get", "/api/housing")
            .then(res => dispatch(loadHousing(res)))
            .catch(err => dispatch(addError(err.message)))
    }
};

export const postHousings = data => (dispatch, getState) => {
    let {currentUser} = getState();
    const username = currentUser.user.username;
    return apiCall("post", `/api/user/${username}/housing`, {username, ...data})
        .then(res => console.log(res))
        .catch(err => dispatch(addError(err.message)))
};
