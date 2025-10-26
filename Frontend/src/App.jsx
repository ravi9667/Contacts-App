import React, { useEffect, useState } from 'react'
import { Routes, Route } from "react-router";
import Login from './components/LoginCompo/Login';
import SignUp from './components/signupCompo/Signup'
import Dashboard from './components/DashboardCompo/Dashboard';
import AddContact from './components/AddContactCompo/AddContact';
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

    return (
        <Routes>
            <Route path='/' element={ <Login /> } />
            <Route path='/dashboard' element={ <Dashboard /> } />
            <Route path='/signup' element={ <SignUp signup={signup} /> } />
            <Route path='/addContact' element={ <AddContact /> } />
        </Routes>
    )
}

export default App;