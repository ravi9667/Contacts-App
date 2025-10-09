import React from "react";
import deleteIcon from "../../assets/delete.png";
import "./Contacts.scss";

const Contact = () => {
    return (
        <div className="contact-container">
            <p className="name">Ravi Ahirwar</p>
            <p className="phoneNum">9345932387</p>
            <p className="age">21</p>
            <div className="delete-box">
                <img src={deleteIcon} alt="delete-icon" />
            </div>
        </div>
    );
};

export default Contact;
