import React, { useEffect, useState } from 'react'
import { Routes, Route } from "react-router";
import Login from './components/loginCompo/login'
import SignUp from './components/signupCompo/Signup'
import Dashboard from './components/DashboardCompo/Dashboard';
import AddContact from './components/AddContactCompo/AddContact';
import './App.scss'

function App() {

    // Login Api Call -->
    async function login(loginData) {
        try {
            const response = await fetch('http://127.0.0.1:5050/login', {
                method: "POST",
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify(loginData)
            });

            const data = await response.json();
            if (data && data?.id) {
                await fetchUser(data?.id)
                await fetchContacts(data?.id)
            }
            return data;
        } catch(err) {
            console.error("Login API error:", err);
            alert(err)
        }
    }

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
            console.log("fetchUser", data)
            return data
        } catch(err) {
            console.log("FatchUser Error", err);
            throw err;
        }
    }  

    // FetchContacts Api call -->
    const fetchContacts = async (userId) => {
        try {
            const response = await fetch(`http://127.0.0.1:5050/fetchUser?userId=${userId}`)
            const data = await response.json();
            console.log("fetchContact", data)
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
            <Route path='/' element={ <Login login={login} /> } />
            <Route path='/signup' element={ <SignUp signup={signup} /> } />
            <Route path='/dashboard' element={ <Dashboard fetchUser={fetchUser} fetchContactS={fetchContacts} /> } />
            <Route path='/addContact' element={ <AddContact addContact={addContact} /> } />
        </Routes>
    )
}

export default App;