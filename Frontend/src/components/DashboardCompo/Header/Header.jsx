import React from "react";
import logo from "../../../assets/logo.png"
import "./Header.scss";

const Header = ({fetchUser}) => {
    const { name, email } = fetchUser || {};

    return (
        <div className="dash-header">
            <div className="user-detail">
                <div className="user-name">{name || "Name"}</div>
                <div className="user-email">{email || "Email"}</div>
            </div>
            <h1 className="contacts-header">Contacts</h1>
            <img src={logo} alt="user-avtar" className="user-logo" />
        </div>
    )
}

export default Header;