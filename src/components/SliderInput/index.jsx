import React from 'react';
import { Slider } from 'antd';

import './index.css';

import Input from '../Input';

const SliderInput = ({title, value, setValue, min = 50000, max = 1000000, step = 10000}) => {
    return (
        <div className="input__item">
            {title && <p className="input__title">{title}: от {min.toLocaleString()} до {max.toLocaleString()}</p>}

            <div className="input__inner">
                <Slider min={min} max={max} step={step} value={typeof value === 'number' ? value : 0} onChange={setValue} />

                <Input readOnly value={value.toLocaleString()} />
            </div>
        </div>
    )
}

export default SliderInput;