import React from "react";

export default function Table(props) {
    const { tableData, tableColumns } = props;

    const getTableHead = (col, key) => <th key={key} className="table-col">{col}</th>
    
    const getTableRow = (row, key) => <tr key={key} className="table-row">{Object.values(row).map(cell => getTableCell(cell, row.id))}</tr>

    const getTableCell = (cell, key) => <td key={`${cell}${key}`} className="table-cell">{cell}</td>

    return (
        <table>
            <thead>
                {tableColumns.map(col => getTableHead(col, col))}
            </thead>
            <tbody>
                {tableData.map(row => getTableRow(row, row.id))}
            </tbody>
        </table>
    )
}
