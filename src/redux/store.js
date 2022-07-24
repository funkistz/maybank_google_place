import reducers from "./reducers";
import { applyMiddleware, legacy_createStore } from "redux";
import thunk from 'redux-thunk';


const store = legacy_createStore(
    reducers,
    applyMiddleware(thunk)
)

export default store;
