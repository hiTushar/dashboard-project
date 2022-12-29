import actionTypes from "./actionTypes"; 
import { initialState } from "./store";

export function modalReducer(state = initialState, action) {
    const payload = action.payload;
    switch(action.type) {
        case actionTypes.SET_MODAL_DATA: 
            return ({
                ...state, 
                modalData: payload
            })

        case actionTypes.SET_SELECTED_ROWS: 
            return ({
                ...state,
                selectedRows: payload
            });

        default: 
            return state;
    }
}
