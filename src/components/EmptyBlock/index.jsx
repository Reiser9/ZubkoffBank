import React from 'react';
import { Empty } from 'antd';

import './index.css';

const EmptyBlock = ({title, fill = false, center = false}) => {
    return (
        <div className={`empty__content${fill ? " fill" : ""}${center ? " content__center" : ""}`}>
            <Empty description={title} />
        </div>
    )
}

export default EmptyBlock;