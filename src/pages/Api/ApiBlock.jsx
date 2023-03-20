import React from "react";

import "./index.css";

import ApiItem from "./ApiItem";

const ApiBlock = ({data}) => {
    const {title, data: apiItems} = data;

    return (
        <div className="api__column">
            <h4 className="api__label">{title}</h4>

            <div className="api__items">
                {apiItems.map((data, id) => <ApiItem key={id} data={data} />)}
            </div>
        </div>
    );
};

export default ApiBlock;
