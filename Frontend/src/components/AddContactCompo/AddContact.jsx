import React, { useState } from "react";
import Button from "../../ReusableComponents/Button/Button"
import { useLocation, useNavigate } from "react-router";
import Dashboard from "../DashboardCompo/Dashboard";
import "./AddContact.scss"

const AddContact = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const params = new URLSearchParams(location.search)
    const userId = params.get("userId")
    const [ addContactFormData, setAddContactFormData ] = useState({
        name: '',
        phoneNumber: '',
        age: ''
    })

    const handleFormInput = (field, event) => {
        setAddContactFormData({...addContactFormData, [field]: event.target.value})
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

    const handleAddContact = async () => {
        try {
            const apiData = {
                name: addContactFormData.name,
                phoneNumber: addContactFormData.phoneNumber,
                age: addContactFormData.age,
                userId: userId
            }
            const response = await addContact(apiData);
            if(response.ok === true) {
                navigate('/dashboard')
            } else {
                alert(response.message || "adding Contact failed");
            }
        } catch(err) {
            alert("Something went wrong during Adding Contact !!")
            console.log(err)
        }
    }

    return (
        <div className="addContact-cont">
            <p className="cancel-btn" onClick={() => navigate('/dashboard')}>✖</p>
            <h1 className="addContact-heading">Add Contact</h1>
            <div className="input-box">
                <div className="input-groups">
                    <input
                        type="text" 
                        id="name"
                        className="input" 
                        placeholder=" " 
                        required
                        onChange={(e) => handleFormInput('name', e)}
                    />
                    <label htmlFor="name" className="labels">Name</label>
                </div>
                <div className="input-groups">
                    <input 
                        type="number" 
                        id="phoneNo" 
                        className="input" 
                        placeholder=""
                        onChange={(e) => handleFormInput('phoneNumber', e)}
                    />
                    <label htmlFor="phoneNo" className="labels">Phone No.</label>
                </div>
                <div className="input-groups">
                    <input 
                        type="number" 
                        id="age" 
                        className="input" 
                        placeholder=""
                        onChange={(e) => handleFormInput('age', e)} 
                    />
                    <label htmlFor="age" className="labels">Age</label>
                </div>
            </div>
            <Button innerText="Add Contact" onClick={handleAddContact} />
        </div>
    )
}

export default AddContact;