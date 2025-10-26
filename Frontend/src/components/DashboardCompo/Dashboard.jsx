import React, { useState, useEffect } from "react";
import ContactTable from "./ContactTable/ContactTable";
import AddContact from "../AddContactCompo/AddContact";
import Header from "./Header/Header";
import { useLocation, useNavigate } from "react-router";
import SearchAdd from "./SearchAdd/SearchAdd";
import './Dashboard.scss'

const Dashboard = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const params = new URLSearchParams(location.search)
    const userId = params.get("userId")
    const [fetchUserDetails, setFetchUserDetails] = useState()
    const [fetchContact, setFetchContact] = useState([])
    const [searchContacts, setSearchContacts] = useState("")

    // FetchUser Api Call -->
    const fetchUser = async (userId) => {
        try {
            const response = await fetch(`http://127.0.0.1:5050/fetchUser?userId=${userId}`)
            const data = await response.json();
            console.log(data)
            if(data.ok) {
                setFetchUserDetails(data?.data)
            } else {
                alert("Failed to fetch User detail");
                return;
            }
            return data;
        } catch(err) {
            console.log("FatchUser Error", err);
            throw err;
        }
    }

    // FetchContacts Api call -->
    const fetchContacts = async (userId) => {
        console.log(userId)
        try {
            const response = await fetch(`http://127.0.0.1:5050/fetchContacts?userId=${userId}`)
            const data = await response.json();
            console.log(data)
            if(data.ok) {
                setFetchContact(data?.data)
            } else {
                alert("Failed to fetch User Contacts");
                return;
            } 
            return data;
        } catch(err) {
            console.log("FetchContact Error", err);
            throw err;
            // alert(err)
        }
    }

    const handleDeleteContact = async (_id) => {
        try {
            const response = await fetch("http://127.0.0.1:5050/deleteContact", {
                method: 'DELETE',
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify({contactId: _id})
            });
            const data = await response.json();
            if(data?.ok) {
                const updatedContacts = fetchContact.filter((contact) => contact._id !== _id);
                setFetchContact(updatedContacts);
            }
            else {
                alert(data?.message)
            }
        } catch(err) {
            alert(err.message)
            console.log(err)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            if (userId) {
                await fetchUser(userId);
                await fetchContacts(userId);
            }
        };
        fetchData();
    }, [userId]);

    
    return (
        <div className="dash-container">
            <Header fetchUser={fetchUserDetails} />
            <SearchAdd userId={userId} searchContacts={searchContacts} setSearchContacts={setSearchContacts} /> 
            <ContactTable fetchContact={fetchContact} handleDeleteContact={handleDeleteContact} searchContacts={searchContacts} />
        </div>
    )
}

export default Dashboard;