import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Login from "./login";
import Dashboard from "../DashboardCompo/Dashboard";
import './login.scss'

const LoginApi = ({ fetchUser, fetchContacts }) => {
    const navigate = useNavigate()
    const [ loginApiData, setLoginApiData ] = useState(null);
    const [ fetchingUser, setFetchingUser ] = useState(null);
    const [ fetchingContacts, setFetchingContacts ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(false)

    // Login API call -->
    async function login(loginData) {
        try {
            const response = await fetch("http://127.0.0.1:5050/login", {
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
                body: JSON.stringify(loginData),
            });

            const data = await response.json();
            return data;
        } catch (err) {
            console.error("Login API error:", err);
            alert(err);
        }
    }

    useEffect(() => {
        if (loginApiData) {
            const fetchUserData = async () => {
                try {
                    setIsLoading(true);
                    const user = await fetchUser(loginApiData);
                    const contacts = await fetchContacts(loginApiData);
                    setFetchingUser(user);
                    setFetchingContacts(contacts);
                    navigate('/dashboard');
                } catch (error) {
                    console.error("Error fetching user/contacts:", error);
                } finally {
                    setIsLoading(false);
                }
            };

            fetchUserData();
        }
    }, [loginApiData]);

    return (
        <div>
            <Login login={login} setLoginApiData={setLoginApiData} />
            <div className="loginApi-container">
                {isLoading && (
                    <div className="loader-overlay">
                    <div className="spinner"></div>
                    <p>Loading, please wait...</p>
                    </div>
                )}

                {fetchingUser && fetchingContacts ? (
                    <Dashboard fetchUser={fetchingUser} fetchContacts={fetchingContacts} />
                ) : (
                    !isLoading && <p className="no-data">No data loaded yet.</p>
                )}
            </div>
        </div>
    );
};

export default LoginApi;
