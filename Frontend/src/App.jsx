import { useState } from 'react'
import { Routes, Route } from "react-router";
import Login from './components/loginCompo/login'
import SignUp from './components/signupCompo/Signup'
import Dashboard from './components/DashboardCompo/Dashboard';
import AddContact from './components/AddContactCompo/AddContact';
import './App.scss'

function App() {
    const [count, setCount] = useState(0)

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
            throw err;
        }
    }

    return (
        <Routes>
            <Route path='/' element={ <Login /> } />
            <Route path='/signup' element={ <SignUp /> } />
            <Route path='/dashboard' element={ <Dashboard /> } />
            <Route path='/addContact' element={ <AddContact /> } />
        </Routes>
        // <Dashboard />
        // <AddContact />
    )
}

export default App;