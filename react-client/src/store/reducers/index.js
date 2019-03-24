import {combineReducers} from "redux";
import currentUser from "./currentUser";
import errors from "./errors";
import housings from "./housings";
import groupbyHousings from "./groupbyHousing";

const rootReducer = combineReducers({
    currentUser,
    errors,
    housings,
    groupbyHousings
});

export default rootReducer;