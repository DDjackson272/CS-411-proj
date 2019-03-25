import {LOAD_HOUSING, LOAD_SINGLE_HOUSING, REMOVE_HOUSING} from "../actionTypes";

const housings = (state=[], action) => {
    switch (action.type) {
        case LOAD_HOUSING:
            return [...action.housings];
        case REMOVE_HOUSING:
            return state.filter(housing => housing.housing_id !== action.housing_id);
        case LOAD_SINGLE_HOUSING:
            return [action.housings];
        default:
            return state;
    }
};

export default housings;