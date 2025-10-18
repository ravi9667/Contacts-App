import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router";
import { useNavigate } from "react-router-dom";
import Login from "./login";
import Dashboard from "../DashboardCompo/Dashboard";

const LoginApi = ({ fetchUser, fetchContacts }) => {
    const [loginApiData, setLoginApiData] = useState(null);
    const [fetchingUser, setFetchingUser] = useState(null);
    const [fetchingContacts, setFetchingContacts] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

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
            if (data.ok === true) {
                setLoginApiData(data.data);
                navigate("/dashboard");
            } else {
                alert(data.message || "Login failed");
            }

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
        <Routes>
            <Route
                path="/"
                element={<Login login={login} setLoginApiData={setLoginApiData} />}
            />
            <Route
                path="/dashboard"
                element={
                    isLoading ? (
                        <div>Loading...</div>
                    ) : fetchingUser && fetchingContacts ? (
                        <Dashboard
                            fetchUser={fetchingUser}
                            fetchContacts={fetchingContacts}
                        />
                    ) : (
                        <Login login={login} setLoginApiData={setLoginApiData} />
                    )
                }
            />
        </Routes>
    );
};

export default LoginApi;
