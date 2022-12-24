import React from "react";
import { connect } from "react-redux";
import { setModalData } from "../redux/actionCreators";
import EventsService from "../utils/events";

function Row(props) {
    const { row } = props;

    const openRow = (data) => {
        EventsService.emitter.emit(EventsService.OPEN_MODAL, data, true);
        props.setModalData(data);
    }

    const getTableCell = (cell, key) => <td key={`${cell}${key}`} className="table-cell">{cell}</td>

    return (
        <tr
            className="table-row" 
            onClick={() => openRow(row)}>
                {Object.values(row).map(cell => getTableCell(cell, row.id))}
        </tr>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        setModalData: (modalData) => dispatch(setModalData(modalData))
    }
}

export default connect(null, mapDispatchToProps)(Row);
