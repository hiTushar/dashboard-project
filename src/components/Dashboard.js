import React, { useState } from "react";
import Pagination from "./Pagination";
import Table from "./Table";

export default function Dashboard(props) {
    const [ data, setData ] = useState(props.data)

    console.log(data);
    return (
        <>
            <Table />
            <Pagination />
        </>
    )
}