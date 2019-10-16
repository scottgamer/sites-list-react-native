import { combineReducers } from "redux";
import sitesReducer from "./sitesReducer";

const reducer = combineReducers({
  sitesReducer: sitesReducer
});

export default reducer;
