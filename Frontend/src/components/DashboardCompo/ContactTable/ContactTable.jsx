import React from "react";
import ContactHeader from "./ContactHeader/ContactHeader";
import Contacts from "./Contacts/Contacts";
import "./ContactTable.scss";

const ContactTable = ({fetchContact, handleDeleteContact}) => {

    return (
        <div className="contacts-cntr">
            <ContactHeader />
            { fetchContact.map((contact) => (
                <Contacts 
                    key={contact._id} 
                    contact={contact}
                    handleDeleteContact={handleDeleteContact}
                />
            )) }
        </div>
    )
}

export default ContactTable;