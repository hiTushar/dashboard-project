import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";
import Table from "./Table";
import Modal from "./Modal";
import EventsService from "../utils/events";

const DEFAULT_ROWS_PER_PAGE = 15;

export default function Dashboard(props) {
    const [ data, setData ] = useState(props.data)
    const [ tableData, setTableData ] = useState([]);
    const [ rowsPerPage, setRowsPerPage ] = useState(DEFAULT_ROWS_PER_PAGE);
    const [ pageNo, setPageNo ] = useState(0);
   
    const updateTableData = (updatedRow) => {
        console.log({ updatedRow, tableData, data });
        let updatedTableData = tableData.map(row => {
            if(!updatedRow.id) { // select all checkbox has been clicked
                return { ...row, selected: updatedRow.selected }
            }
            if (updatedRow.id === row.id) {
                return updatedRow
            }
            return row;
        });
        console.log(updatedTableData);
        setTableData(updatedTableData);
    }

    useEffect(() => {
        EventsService.emitter.addListener(EventsService.UPDATE_ROWS, (updatedRow) => updateTableData(updatedRow));
    }, [])

    useEffect(() => {
        console.log({ rowsPerPage, pageNo });
        let firstRowIndex = rowsPerPage * pageNo;
        let lastRowIndex = rowsPerPage * pageNo + rowsPerPage;
        setTableData(data.slice(firstRowIndex, lastRowIndex));
    }, [rowsPerPage, pageNo]);

    console.log(tableData);
    return (
        <div className="dashboard">
            {
                tableData.length ? (
                    <>
                        <Table 
                            tableData={tableData} 
                            tableColumns={Object.keys(tableData[0])}
                        />
                        <Pagination 
                            setRowsPerPage={setRowsPerPage}
                            setPageNo={setPageNo}
                            pageNo={pageNo}
                            totalRows={data.length}
                            rowsPerPage={rowsPerPage}
                        />
                    </>
                ) : null
            }
            <Modal />
        </div>
    )
}

