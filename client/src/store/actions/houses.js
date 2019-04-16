import { apiCall } from "../../services/api";
import { addError } from "./errors";
import { LOAD_HOUSES, REMOVE_HOUSES, LOAD_SEARCH_HOUSES, LOAD_RECOMMEND_HOUSES } from "../actionTypes";

export const loadHouses = houses => ({
	type: LOAD_HOUSES,
	houses
});

export const loadSearchHouses = houses => ({
	type: LOAD_SEARCH_HOUSES,
	houses
});

export const remove = housing_id => ({
	type: REMOVE_HOUSES,
	housing_id
});

export const loadRecommendHouses = houses => ({
    type:LOAD_RECOMMEND_HOUSES,
    houses
});

export const removeHouses = (username, housing_id) => {
	return dispatch => {
		return apiCall("delete", `/api/user/${username}/housing/${housing_id}`)
			.then(() => dispatch(remove(housing_id)))
			.catch(err => dispatch(addError(err.message)))
	}
};

export const fetchHouses = () => {
	return dispatch => {
		return apiCall("get", "/api/housing")
			.then(res => dispatch(loadHouses(res)))
			.catch(err => dispatch(addError(err.message)))
	}
};

export const fetchSearchHouses = keyword => {
	return dispatch => {
		return apiCall("get", `/api/housing/search/${keyword}`)
			.then((res) => dispatch(loadSearchHouses(res)))
			.catch(err => dispatch(addError(err.message)))
	}
};

export const putHouses = (username, housing_id, data) => {
    return dispatch => {
        return apiCall("put", `/api/user/${username}/housing/${housing_id}`, data)
            .then(res => console.log(res.error.message))
            .catch(err => dispatch(addError(err.message)))
    };
};

export const postNewHouse = data => (dispatch, getState) => {
	let {currentUser} = getState();
	const username = currentUser.user.username;
	return apiCall("post", `/api/user/${username}/housing`, {username, ...data})
			.then(res => console.log(res.message))
			.catch(err => dispatch(addError(err.message)));
}

export const fetchRecommendHouses = (username) => {
    return  dispatch => {
        return apiCall("get",  `/api/housing/${username}/recommend`)
            .then(res => dispatch(loadRecommendHouses(res)))
            .catch(err => dispatch(addError(err.message)))
    }
};

export const changeHistory = (username, housing_id) => {
    console.log(username, housing_id);
    return dispatch => {
        return apiCall("post", `/api/user/${username}/add/${housing_id}`)
            .then(res => console.log(res.message))
            .catch(err => dispatch(addError(err.message)))
    }
};