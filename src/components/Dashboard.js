import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";
import Table from "./Table";
import Modal from "./Modal";
import { setSelectedRows } from "../redux/actionCreators";
import { connect } from "react-redux";

const DEFAULT_ROWS_PER_PAGE = 15;

function Dashboard(props) {
    const [ data, setData ] = useState(props.data)
    const [ tableData, setTableData ] = useState([]);
    const [ rowsPerPage, setRowsPerPage ] = useState(DEFAULT_ROWS_PER_PAGE);
    const [ pageNo, setPageNo ] = useState(0);
    
    useEffect(() => {
        let firstRowIndex = rowsPerPage * pageNo;
        let lastRowIndex = rowsPerPage * pageNo + rowsPerPage;
        let tableDataVal = data.slice(firstRowIndex, lastRowIndex);
        setTableData(tableDataVal);

        let selectedRowsVal = tableDataVal.reduce((temp, row) => {
            return { ...temp, [row.id]: false }
        }, {});
        props.setSelectedRows(selectedRowsVal);
    }, [rowsPerPage, pageNo]);

    console.log(props.selectedRows);
    return (
        <div className="dashboard">
            {
                tableData.length ? (
                    <>
                        <Table 
                            tableData={tableData} 
                            tableColumns={Object.keys(tableData[0])}
                            setTableData={setTableData}
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

const mapStateToProps = state => {
    return {
        selectedRows: state.selectedRows
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setSelectedRows: (selectedRows) => dispatch(setSelectedRows(selectedRows))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
