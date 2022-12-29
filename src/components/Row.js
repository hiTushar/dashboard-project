import React from "react";
import { connect } from "react-redux";
import { setModalData, setSelectedRows } from "../redux/actionCreators";
import EventsService from "../utils/events";

function Row(props) {
    const { row } = props;

    const openRow = (data) => {
        EventsService.emitter.emit(EventsService.OPEN_MODAL, data, true);
        props.setModalData(data);
    }

    const selectRow = (event) => {
        event.stopPropagation();
        const { checked } = event.target;

        let selectedRowsVal = { ...props.selectedRows };
        selectedRowsVal[row.id] = checked;
        props.setSelectedRows(selectedRowsVal);
    }

    const getTableRowCell = (data, key) => <td key={`${data}${key}`} className="table-cell">{data}</td>

    const getCells = (row) => {
        let tdArray = [];
        for(let i = 0; i < Object.values(row).length; i++) {
            let td = null;
            if (i === 0) {
                td = getTableRowCell(<input type="checkbox" checked={props.selectedRows[row.id]} onChange={(e) => selectRow(e)} onClick={e => e.stopPropagation()}/>)
                tdArray.push(td);
            }
            td = getTableRowCell(Object.values(row)[i]);
            tdArray.push(td);
        }
        return tdArray;
    }

    return (
        <tr
            className="table-row" 
            onClick={() => openRow(row)}
        >
            {getCells(row)}
        </tr>
    )
}

const mapStateToProps = state => {
    return {
        selectedRows: state.selectedRows
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setModalData: (modalData) => dispatch(setModalData(modalData)),
        setSelectedRows: (selectedRows) => dispatch(setSelectedRows(selectedRows))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Row);
