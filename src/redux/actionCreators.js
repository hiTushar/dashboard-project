import actionTypes from "./actionTypes"

export function setModalData(data) {
    return ({
        type: actionTypes.SET_MODAL_DATA,
        payload: data
    })
}

export function setSelectedRows(data) {
    return ({
        type: actionTypes.SET_SELECTED_ROWS,
        payload: data
    })
}
