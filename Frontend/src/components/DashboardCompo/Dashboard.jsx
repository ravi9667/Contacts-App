import React, { useState } from "react";
import Contact from "../ContactsCompo/Contacts";
import AddContact from "../AddContactCompo/AddContact";
import { useNavigate } from "react-router";
import './Dashboard.scss'
import logo from "../../assets/logo.png"
import search from "../../assets/search.png"
import add from "../../assets/addition.png"

const Dashboard = () => {
    const navigate = useNavigate()

    const handleAddContact = () => {
        setShowAddContact(true)
    };

    return (
        <div className="dash-container">
            <div className="dash-header">
                <div className="user-detail">
                    <div className="user-name">Manik</div>
                    <div className="user-email">manik123@gmail.com</div>
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
                    <Contact />
                </div>
            </div>
        </div>
    )
}

export default Dashboard;