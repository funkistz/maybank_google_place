import { ActionTypes } from "../constant/action-types"

export const setPlaces = (places) => {
    return {
        type: ActionTypes.SET_PLACES,
        payload: places
    };

}