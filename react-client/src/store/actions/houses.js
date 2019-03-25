import {apiCall} from "../../services/api";
import {addError} from "./errors";
import {LOAD_HOUSING, REMOVE_HOUSING, LOAD_GROUPBY_HOUSING} from "../actionTypes";

export const loadHousing = housings => ({
    type: LOAD_HOUSING,
    housings
});

export const remove = housing_id => ({
    type: REMOVE_HOUSING,
    housing_id
});

export const loadGroupbyHousing = groupbyHousings => ({
    type: LOAD_GROUPBY_HOUSING,
    groupbyHousings
});

export const removeHousings = (username, housing_id) => {
    return dispatch => {
        return apiCall("delete", `/api/user/${username}/housing/${housing_id}`)
            .then(() => dispatch(remove(housing_id)))
            .catch(err => dispatch(addError(err.message)))
    }
};

export const putHousings = (username, housing_id, data) => {
    return dispatch => {
        return apiCall("put", `/api/user/${username}/housing/${housing_id}`, data)
            .then(res => console.log(res.error.message))
            .catch(err => dispatch(addError(err.message)))
    };
};

export const fetchHousings = () => {
    return dispatch => {
        return apiCall("get", "/api/housing")
            .then(res => dispatch(loadHousing(res)))
            .catch(err => dispatch(addError(err.message)))
    }
};

export const fetchGroupByHousing = () => {
    return dispatch => {
        return apiCall("get", "/api/housing/analysis")
            .then(res => dispatch(loadGroupbyHousing(res)))
            .catch(err => dispatch(addError(err.message)))
    }
};

export const postHousings = data => (dispatch, getState) => {
    let {currentUser} = getState();
    const username = currentUser.user.username;
    return apiCall("post", `/api/user/${username}/housing`, {username, ...data})
        .then(res => console.log(res.message))
        .catch(err => dispatch(addError(err.message)))
};
