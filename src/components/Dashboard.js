import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";
import Table from "./Table";

const DEFAULT_ROWS_PER_PAGE = 15;

export default function Dashboard(props) {
    const [ data, setData ] = useState(props.data)
    const [ tableData, setTableData ] = useState([]);
    const [ rowsPerPage, setRowsPerPage ] = useState(DEFAULT_ROWS_PER_PAGE);
    const [ pageNo, setPageNo ] = useState(0);

    useEffect(() => {
        console.log({ rowsPerPage, pageNo });
        let firstRowIndex = rowsPerPage * pageNo;
        let lastRowIndex = rowsPerPage * pageNo + rowsPerPage;
        setTableData(data.slice(firstRowIndex, lastRowIndex));
    }, [rowsPerPage, pageNo]);

    return (
        <>
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
        </>
    )
}