import React from 'react';

import '../Input/index.css';
import './index.css';

const File = ({title, id, setValue, accept, type}) => {
    const [image, setImage] = React.useState("");

    const onInputChange = (e) => {
        setValue(e.target.files[0]);
        const fileReader = new FileReader();
        fileReader.readAsDataURL(e.target.files[0]);

        fileReader.onloadend = () => {
            setImage(fileReader.result);
        };
    };

    return (
        <div className="input__item">
            {title && <p className="input__title">{title}</p>}

            <div className="input__inner">
                <input
                    id={id}
                    type="file"
                    className="file"
                    accept={accept || 'image/png, image/jpeg, image/svg+xml'}
                    onChange={onInputChange}
                />

                <label htmlFor={id} className={`input__file--label ${type || 'standart'}${image ? " preview" : ""}`}>
                    {image
                    ? <img src={image} alt="card preview" className="input__file--preview" />
                    : <img src="/assets/img/picture.svg" alt="no picture" className="input__file--img" />}
                </label>
            </div>
        </div>
    )
}

export default File;