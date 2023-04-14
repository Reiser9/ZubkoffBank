import React from 'react';

import './index.css';

const SignImgBlock = ({title, img, points = []}) => {
    return (
        <div className="sign__info">
            <img src={`/assets/img/${img}.svg`} alt="sign img" className="register__icon" />

            <p className="sign__info--title">
                {title}
            </p>

            {points.length > 0 && <div className="sign__info--points">
                {points.map((data, id) => <p key={id} className="sign__info--point">
                    {data.text}
                </p>)}
            </div>}
        </div>
    )
}

export default SignImgBlock;