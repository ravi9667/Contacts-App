import React, { useEffect, useState } from 'react'
import { Routes, Route } from "react-router";
import Login from './components/loginCompo/login'
import SignUp from './components/signupCompo/Signup'
import Dashboard from './components/DashboardCompo/Dashboard';
import AddContact from './components/AddContactCompo/AddContact';
import './App.scss'

function App() {
    const [ user, setUser ] = useState(null)

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
            return data
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
    useEffect(() => {
        const fetchUser = async (userId) => {
            try {
                const response = await fetch(`http://127.0.0.1:5050/fetchUser?userId=${userId}`)
                const data = await response.json();
                return data
            } catch(err) {
                console.log("FatchUser Error", err);
                throw err;
            }
        }  
    },[user])

    // FetchContacts Api call 
    const fetchContacts = async (userId) => {
        try {
            const response = await fetch(`http://127.0.0.1:5050/fetchUser?userId=${userId}`)
            const data = await response.json();
            return data;
        } catch(err) {
            console.log("FatchContact Error", err);
            throw err
        }
    }

    return (
        <Routes>
            <Route path='/' element={ <Login login={login} setUser={setUser} /> } />
            <Route path='/signup' element={ <SignUp signup={signup} /> } />
            <Route path='/dashboard' element={ <Dashboard user={user} fetchContacts={fetchContacts} /> } />
            <Route path='/addContact' element={ <AddContact /> } />
        </Routes>
        // <Dashboard />
        // <AddContact />
    )
}

export default App;