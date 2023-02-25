import React from 'react';

import './index.css';

const ErrorBlock = ({text}) => {
    return(
        <p className="error__block">{text}</p>
    )
}

export default ErrorBlock;