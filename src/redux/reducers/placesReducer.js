import { ActionTypes } from "../constant/action-types"

const initialState = {
    places: []
}

export const placesReducer = (state = initialState, { type, payload }) => {

    switch (type) {
        case ActionTypes.SET_PLACES:
            return { ...state, places: payload };
        default:
            return state;
    }
}