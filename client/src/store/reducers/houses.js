import { LOAD_HOUSES, REMOVE_HOUSES, LOAD_SEARCH_HOUSES, LOAD_RECOMMEND_HOUSES } from "../actionTypes";

const houses =(state=[], action) => {
	switch(action.type) {
		case LOAD_HOUSES:
			return [...action.houses];
		case REMOVE_HOUSES:
			return state.filter(houses => houses.housing_id !== action.housing_id);
		case LOAD_SEARCH_HOUSES:
			return [...action.houses];
		case LOAD_RECOMMEND_HOUSES:
			return [...action.houses];
		default:
			return state;
	}
}

export default houses;