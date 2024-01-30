import React from "react";

export default function Shittim({children}) {
    return (
        <div className="shittim">
            <div className="shittim-speaker"/>
            <div className="shittim-button"/>
            {children}
        </div>
    );
}