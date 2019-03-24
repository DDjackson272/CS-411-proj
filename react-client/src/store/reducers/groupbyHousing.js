import {LOAD_GROUPBY_HOUSING} from "../actionTypes";

const groupbyHousings = (state=[], action) => {
    switch (action.type) {
        case LOAD_GROUPBY_HOUSING:
            return [...action.groupbyHousings];
        default:
            return state;
    }
};

export default groupbyHousings;