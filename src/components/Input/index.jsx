import React from "react";
import InputMask from "react-input-mask";

import "./index.css";

import { Eye, Blind } from "../Icons";
import { DatePicker } from "antd";

const Input = ({
    title,
    value,
    setValue,
    password = false,
    className,
    readOnly = false,
    date = false,
    ...props
}) => {
    const [view, setView] = React.useState(false);

    const changeView = () => {
        setView((prev) => !prev);
    };

    const changeHandler = (e) => {
        setValue(e.target.value);
    };

    return (
        <div className="input__item">
            {title && <p className="input__title">{title}</p>}

            <div className="input__inner">
                {date ? (
                    <DatePicker
                        value={value}
                        onChange={setValue}
                        className={`input default__input${
                            className ? " " + className : ""
                        }`}
                        format={"DD.MM.YYYY"}
                        placeholder={props.placeholder ? props.placeholder : ""}
                        {...props}
                    />
                ) : (
                    <InputMask
                        maskChar={null}
                        value={value}
                        readOnly={readOnly}
                        onChange={changeHandler}
                        type={password ? (view ? "text" : "password") : "text"}
                        className={`input default__input${
                            className ? " " + className : ""
                        }${password ? " password__input" : ""}`}
                        {...props}
                    />
                )}

                {password &&
                    (view ? (
                        <Blind className="input__icon" onClick={changeView} />
                    ) : (
                        <Eye className="input__icon" onClick={changeView} />
                    ))}
            </div>
        </div>
    );
};

export default Input;
