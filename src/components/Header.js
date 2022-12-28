import React from "react";
import EventsService from "../utils/events";

export default function Header(props) {
    const { columns } = props;

    const selectAllRows = (event) => {
        const { checked } = event.target;
        EventsService.emitter.emit(EventsService.SELECT_ROW, checked);
        EventsService.emitter.emit(EventsService.UPDATE_ROWS, { selected: checked });
    }

    const getTableHeadCell = (data) => <th key={data} className="table-col">{data}</th>

    let thArray = [];
    for (let i = 0; i < columns.length; i++) {
        let th = null;
        if (i === 0) {
            th = getTableHeadCell(<input type="checkbox" onChange={(e) => selectAllRows(e)}/>);
            thArray.push(th)
        }
        th = getTableHeadCell(columns[i]);
        thArray.push(th)
    }
    return thArray;
}
