import React from "react";
import './Button.scss';

const Button = ({innerText}) => {
    return (
        <button className="button">{innerText}</button>
    )
}

export default Button;