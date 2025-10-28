import React, { useState, useEffect } from "react";
import ContactTable from "./ContactTable/ContactTable";
import Header from "./Header/Header";
import { useLocation } from "react-router";
import SearchAdd from "./SearchAdd/SearchAdd";
import "./Dashboard.scss";

const Dashboard = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const userId = params.get("userId");

    const [fetchUserDetails, setFetchUserDetails] = useState();
    const [contacts, setContact] = useState([]);
    const [searchContacts, setSearchContacts] = useState("");

    const fetchUser = async (userId) => {
        try {
            const response = await fetch(`http://127.0.0.1:5050/fetchUser?userId=${userId}`);
            const data = await response.json();
            if (data.ok) setFetchUserDetails(data.data);
        } catch (err) {
            console.error("FetchUser Error", err);
        }
    };

    const fetchContacts = async (userId) => {
        try {
            const response = await fetch(`http://127.0.0.1:5050/fetchContacts?userId=${userId}`);
            const data = await response.json();
            if (data.ok) setContact(data.data);
        } catch (err) {
            console.error("FetchContacts Error", err);
        }
    };

    const handleDeleteContact = async (_id) => {
        try {
            const response = await fetch("http://127.0.0.1:5050/deleteContact", {
                method: "DELETE",
                headers: { "Content-type": "application/json; charset=UTF-8" },
                body: JSON.stringify({ contactId: _id }),
            });
            const data = await response.json();
            if (data.ok) setContact((prev) => prev.filter((c) => c._id !== _id));
        } catch (err) {
            console.error("Delete Error", err);
        }
    };

    const handleContactAdded = (newContact) => {
        setContact((prev) => [...prev, newContact]);
    };

    useEffect(() => {
        if (userId) {
            fetchUser(userId);
            fetchContacts(userId);
        }
    }, [userId]);

    return (
        <div className="dash-container">
            <Header fetchUser={fetchUserDetails} />
            <SearchAdd
                userId={userId}
                searchContacts={searchContacts}
                setSearchContacts={setSearchContacts}
                onContactAdded={handleContactAdded}
            />
            <ContactTable
                contacts={contacts}
                handleDeleteContact={handleDeleteContact}
                searchContacts={searchContacts}
            />
        </div>
    );
};

export default Dashboard;
