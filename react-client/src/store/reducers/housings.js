import {LOAD_HOUSING, REMOVE_HOUSING} from "../actionTypes";

const housings = (state=[], action) => {
    switch (action.type) {
        case LOAD_HOUSING:
            return [...action.housings];
        default:
            return state;
    }
};

export default housings;