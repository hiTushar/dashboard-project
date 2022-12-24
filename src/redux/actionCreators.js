import actionTypes from "./actionTypes"

export function setModalData(data) {
    return ({
        type: actionTypes.SET_MODAL_DATA,
        payload: data
    })
}
