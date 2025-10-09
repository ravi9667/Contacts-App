import React from "react";
import './Button.scss';

const Button = ({innerText, onClick}) => {
    return (
        <button className="button" onClick={onClick}>{innerText}</button>
    )
}

export default Button;