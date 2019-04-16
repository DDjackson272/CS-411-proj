import { combineReducers } from "redux";
import currentUser from "./currentUser";
import errors from "./errors";
import houses from "./houses";

const rootReducer = combineReducers({
	currentUser,
	errors,
	houses
});

export default rootReducer;