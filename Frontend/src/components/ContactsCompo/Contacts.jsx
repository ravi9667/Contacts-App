import React from "react";
import deleteIcon from "../../assets/delete.png";
import "./Contacts.scss";

const Contact = ({name, phoneNumber, age, userId, contactId}) => {
    return (
        <div className="contact-container">
            <p className="name">{name}</p>
            <p className="phoneNum">{phoneNumber}</p>
            <p className="age">{age}</p>
            <div className="delete-box">
                <img src={deleteIcon} alt="delete-icon" />
            </div>
        </div>
    );
};

export default Contact;
