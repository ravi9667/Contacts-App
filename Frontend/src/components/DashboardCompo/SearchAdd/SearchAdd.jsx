import React, { useState } from "react";
import add from "../../../assets/addition.png";
import search from "../../../assets/search.png";
import AddContact from "./AddContactCompo/AddContact";
import "./Search.scss";

const SearchAdd = ({ userId, searchContacts, setSearchContacts, onContactAdded }) => {
    const [showAddModal, setShowAddModal] = useState(false);

    return (
        <div className="search-addCont">
            <div className="search-box">
                <img src={search} alt="" className="search-icon" />
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search contacts..."
                    onChange={(e) => setSearchContacts(e.target.value)}
                    value={searchContacts}
                />
            </div>

            <img
                src={add}
                onClick={() => setShowAddModal(true)}
                alt="add-Contact"
                className="addContact-btn"
            />

            {showAddModal && (
                <AddContact
                    userId={userId}
                    onClose={() => setShowAddModal(false)}
                    onContactAdded={(newContact) => {
                        onContactAdded(newContact);
                        setShowAddModal(false);
                    }}
                />
            )}
        </div>
    );
};

export default SearchAdd;
