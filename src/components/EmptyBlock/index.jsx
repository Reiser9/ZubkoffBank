import React from 'react';
import { Empty } from 'antd';

import './index.css';

const EmptyBlock = ({title, fill = false}) => {
    return (
        <div className={`empty__content${fill ? " fill" : ""}`}>
            <Empty description={title} />
        </div>
    )
}

export default EmptyBlock;