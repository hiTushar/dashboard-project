import React from "react";
import Row from "./Row";

export default function Table(props) {
    const { tableData, tableColumns } = props;

    const getTableHead = (col) => <th key={col} className="table-col">{col}</th>

    const getTableRow = (row) => <Row key={row.id} row={row}/>

    return (
        <div className="dashboard-table">
            <table>
                <thead>
                    {tableColumns.map(col => getTableHead(col))}
                </thead>
                <tbody>
                    {tableData.map(row => getTableRow(row))}
                </tbody>
            </table>
        </div>
    )
}
