import { combineReducers } from "redux";
import { placesReducer } from "./placesReducer";

const reducers = combineReducers({
    allPlaces: placesReducer
})

export default reducers