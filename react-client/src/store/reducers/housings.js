import {LOAD_HOUSING, REMOVE_HOUSING} from "../actionTypes";

const housings = (state=[], action) => {
    switch (action.type) {
        case LOAD_HOUSING:
            return [...action.housings];
        case REMOVE_HOUSING:
            return state.filter(housing => housing.housing_id !== action.housing_id);
        default:
            return state;
    }
};

export default housings;