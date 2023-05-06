import React from 'react';
import { Empty } from 'antd';

import './index.css';

const EmptyBlock = ({title, fill = false, center = false, children}) => {
    return (
        <div className={`empty__content${fill ? " fill" : ""}${center ? " content__center" : ""}`}>
            <Empty description={title} />

            {children}
        </div>
    )
}

export default EmptyBlock;