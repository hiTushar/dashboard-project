import React, { useEffect, useState } from "react";
import Row from "./Row";
import Header from "./Header";

export default function Table(props) {
    const { tableData, tableColumns } = props;
    const [ selectAll, setSelectAll ] = useState(false);

    const getTableHeader = (columns) => <Header columns={columns} />

    // const getTableRow = (row) => <Row key={row.id} row={row} selected={selectAll}/>
    const getTableRow = (row) => <Row key={row.id} row={row} />

    return (
        <div className="dashboard-table">
            <table>
                <thead className="table-head">
                    {getTableHeader(tableColumns)}
                </thead>
                <tbody>
                    {tableData.map(row => getTableRow(row))}
                </tbody>
            </table>
        </div>
    )
}
