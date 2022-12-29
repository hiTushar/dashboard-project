import React, { useState } from "react";
import { connect } from "react-redux";
import { setSelectedRows } from "../redux/actionCreators";
import EventsService from "../utils/events";

function Header(props) {
    const { columns } = props;
    const [ select, setSelect ] = useState(false);

    const selectAllRows = (event) => {
        const { checked } = event.target;
        
        setSelect(checked);

        let selectedRowsVal = { ...props.selectedRows };
        for (let id in selectedRowsVal) {
            selectedRowsVal[id] = checked;
        }
        props.setSelectedRows(selectedRowsVal);
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);
