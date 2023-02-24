import React from 'react';

import './index.css';

const FaqItem = ({title, text}) => {
    const [active, setActive] = React.useState(false);

    const changeActive = () => {
        setActive(prev => !prev);
    }

    return(
        <div className="faq__item">
            <div className="faq__question" onClick={changeActive}>
                {title}

                <div className={`faq__btn${active ? " active" : ""}`}></div>
            </div>

            <div className={`faq__answer${active ? " active" : ""}`}>
                {text}
            </div>
        </div>
    )
}

export default FaqItem;