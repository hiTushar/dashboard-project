import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { setModalData } from "../redux/actionCreators";
import EventsService from "../utils/events";

function Row(props) {
    const { row, selected } = props;

    const [ select, setSelect ] = useState(row.selected);

    useEffect(() => {
        // EventsService.emitter.addListener(EventsService.SELECT_ROW, (value) => setSelect(value));
    }, [])

    const openRow = (data) => {
        EventsService.emitter.emit(EventsService.OPEN_MODAL, data, true);
        props.setModalData(data);
    }

    const selectRow = (event) => {
        event.stopPropagation();
        const { checked } = event.target;
        console.log({ ...row, selected: checked });
        EventsService.emitter.emit(EventsService.UPDATE_ROWS, { ...row, selected: checked });
    }

    const getTableRowCell = (data, key) => <td key={`${data}${key}`} className="table-cell">{data}</td>

    const getCells = (row) => {
        let tdArray = [];
        for(let i = 0; i < Object.values(row).length; i++) {
            let td = null;
            if (i === 0) {
                td = getTableRowCell(<input type="checkbox" checked={row.selected} onChange={(e) => selectRow(e)} onClick={e => e.stopPropagation()}/>)
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

const mapDispatchToProps = dispatch => {
    return {
        setModalData: (modalData) => dispatch(setModalData(modalData))
    }
}

export default connect(null, mapDispatchToProps)(Row);
