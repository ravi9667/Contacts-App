import React from "react";
import ContactHeader from "./ContactHeader/ContactHeader";
import Contacts from "./Contacts/Contacts";
import "./ContactTable.scss";

const ContactTable = ({fetchContact, handleDeleteContact, searchContacts}) => {
    const filteredContacts = fetchContact.filter((contact) => {
        const term = searchContacts.toLowerCase();
        return (
            contact.name.toLowerCase().includes(term) ||
            contact.phoneNumber.toLowerCase().includes(term) ||
            contact.age.toLowerCase().includes(term)
        );
    });

    return (
        <div className="contacts-cntr">
            <ContactHeader />
            {filteredContacts.length > 0 ? (
                fetchContact.map((contact) => (
                    <Contacts 
                        key={contact._id} 
                        contact={contact}
                        handleDeleteContact={handleDeleteContact}
                    />
                ))
            ) : (
                <p className="no-results">No Contacts Found.</p>
            )}
        </div>
    )
}

export default ContactTable;