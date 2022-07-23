import reducers from "./reducers";
import { legacy_createStore } from "redux";


const store = legacy_createStore(
    reducers
)

export default store;
