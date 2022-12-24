import { legacy_createStore } from "redux";
import { modalReducer } from "./reducers"

export const initialState = {
    modalData: []
}

export const store = legacy_createStore(modalReducer);
