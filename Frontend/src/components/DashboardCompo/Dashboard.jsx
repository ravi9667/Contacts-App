import React, { useState, useEffect } from "react";
import Contact from "../ContactsCompo/Contacts";
import AddContact from "../AddContactCompo/AddContact";
import { useLocation, useNavigate } from "react-router";
import './Dashboard.scss'
import logo from "../../assets/logo.png"
import search from "../../assets/search.png"
import add from "../../assets/addition.png"

const Dashboard = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const params = new URLSearchParams(location.search)
    const userId = params.get("userId")
    const [fetchUserDetails, setFetchUserDetails] = useState()
    const [fetchContact, setFetchContact] = useState([])

    // FetchUser Api Call -->
    const fetchUser = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:5050/fetchUser?userId=${userId}`)
            const data = await response.json();
            console.log(data)
            // if(data.ok) {
            //     alert()
            // }
            return data;
        } catch(err) {
            console.log("FatchUser Error", err);
            throw err;
        }
    }
    fetchUser()   

    // FetchContacts Api call -->
    const fetchContacts = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:5050/fetchContacts?userId=${userId}`)
            const data = await response.json();
            if(!data) {
                alert("Failed to fetch User");
                return;
            }
            return data;
        } catch(err) {
            console.log("FetchContact Error", err);
            throw err
        }
    }
    
    return (
        <div className="dash-container">
            <div className="dash-header">
                <div className="user-detail">
                    <div className="user-name">Name</div>
                    <div className="user-email">Email</div>
                </div>
                <h1 className="contact-header">Contacts</h1>
                <img src={logo} alt="user-avtar" className="user-logo" />
            </div>
            <div className="search-addCont">
                <div className="search-box">
                    <img src={search} alt="" className="search-icon"/>
                    <input type="text" className="search-input" placeholder="Search here..." />
                </div>
                <img src={add} onClick={() => navigate('/addContact')} alt="add-Contact" className="addContact-btn" />
            </div>  
            <div className="contacts-cntr">
                <div className="contact-header">
                    <p className="contact-title contact-name">Name</p>
                    <p className="contact-title contact-phnNo">Phone No.</p>
                    <p className="contact-title contact-age">Age</p>
                    <p className="contact-title contact-empty"></p>
                </div>
                <div className="contacts">
                    {fetchContact.map((contact, idx) => {
                        return (
                            <Contact 
                                key={idx}
                                userId={contact.userId}
                                name={contact.name}
                                phoneNumber={contact.phoneNumber}
                                age={contact.age}
                                contactId={contact._id}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Dashboard;