import React from "react";
import "./ContactHeader.scss"

const ContactHeader = () => {
    return (
        <div className="contact-header">
            <p className="contact-title contact-name">Name</p>
            <p className="contact-title contact-phnNo">Phone No.</p>
            <p className="contact-title contact-age">Age</p>
            <p className="contact-title contact-empty"></p>
        </div>
    )
}

export default ContactHeader;