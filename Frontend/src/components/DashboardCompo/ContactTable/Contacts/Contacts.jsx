import React from "react";
import deleteIcon from '../../../../assets/delete.png'
import "./Contacts.scss";

const Contacts = ({contact, handleDeleteContact}) => {
    const {name, phoneNumber, age} = contact;

    return (
        <div className="contact-container">
            <p className="name">{name}</p>
            <p className="phoneNum">{phoneNumber}</p>
            <p className="age">{age}</p>
            <button className="delete-box" onClick={() => handleDeleteContact(contact._id)}>
                <img src={deleteIcon} alt="delete-icon" />
            </button>
        </div>
    )
}

export default Contacts;