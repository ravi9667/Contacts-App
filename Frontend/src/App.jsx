import React, { useEffect, useState } from 'react'
import { Routes, Route } from "react-router";
import Login from './components/LoginCompo/login';
import SignUp from './components/signupCompo/Signup'
import Dashboard from './components/DashboardCompo/Dashboard';
import AddContact from './components/AddContactCompo/AddContact';
import LoginApi from './components/LoginCompo/ApiLogin';
import './App.scss'

function App() {

    // SignUp Api Call -->
    const signup = async (signupData) => {
        try {
            const response = await fetch('http://127.0.0.1:5050/signup', {
                method: "POST",
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify(signupData)
            })

            const data = await response.json();
            return data;
        } catch(err) {
            console.log("Signup Error", err);
            throw err
        }
    }

    // FetchUser Api Call -->
    const fetchUser = async (userId) => {
        try {
            const response = await fetch(`http://127.0.0.1:5050/fetchUser?userId=${userId}`)
            const data = await response.json();
            if(!data) {
                alert("Failed to fetch User");
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

    // AddContact Api Call
    const addContact = async (addContactData) => {
        try {
            const response = await fetch("http://127.0.0.1:5050/addContact", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify(addContactData)
            });

            const data = await response.json();
            return data;
        } catch(err) {
            console.log("addContact Error", err);
            throw err;
        }
    }

    return (
        <Routes>
            <Route path='/*' element={ <LoginApi fetchUser={fetchUser} fetchContacts={fetchContacts} /> } />
            <Route path='/signup' element={ <SignUp signup={signup} /> } />
            <Route path='/addContact' element={ <AddContact addContact={addContact} /> } />
        </Routes>
    )
}

export default App;