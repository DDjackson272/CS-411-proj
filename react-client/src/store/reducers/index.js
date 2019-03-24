import {combineReducers} from "redux";
import currentUser from "./currentUser";
import errors from "./errors";
import housings from "./housings";

const rootReducer = combineReducers({
    currentUser,
    errors,
    housings
});

export default rootReducer;