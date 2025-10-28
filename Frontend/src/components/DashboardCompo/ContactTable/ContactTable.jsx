import React from "react";
import ContactHeader from "./ContactHeader/ContactHeader";
import Contacts from "./Contacts/Contacts";
import "./ContactTable.scss";

const ContactTable = ({ contacts, handleDeleteContact, searchContacts }) => {
    const filteredContacts = contacts.filter((contact) => {
        const term = searchContacts.toLowerCase().trim();

        const name = contact.name?.toString().toLowerCase() || "";
        const phone = contact.phoneNumber?.toString().toLowerCase() || "";
        const age = contact.age?.toString().toLowerCase() || "";

        return name.includes(term) || phone.includes(term) || age.includes(term);
    });

    return (
        <div className="contacts-cntr">
            <ContactHeader />
            {filteredContacts.length > 0 ? (
                filteredContacts.map((contact) => (
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
    );
};

export default ContactTable;
