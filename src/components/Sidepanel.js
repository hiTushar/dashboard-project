import React from "react";
import { Link } from "react-router-dom";

export default function Sidepanel() {
    return (
        <div className="sidepanel">
            <Link to="/dashboard">
                <div>Dashboard</div>
            </Link>
                <Link to="/about">
                    <div>
                        About
                    </div>
                </Link>
        </div>
    )
}
