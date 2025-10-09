import React from "react";
import Button from "../../ReusableComponents/Button/Button"
import { useNavigate } from "react-router";
import Dashboard from "../DashboardCompo/Dashboard";
import "./AddContact.scss"

const AddContact = () => {
    const navigate = useNavigate()

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
                    />
                    <label htmlFor="name" className="labels">Name</label>
                </div>
                <div className="input-groups">
                    <input 
                        type="number" 
                        id="phoneNo" 
                        className="input" 
                        placeholder="" 
                    />
                    <label htmlFor="phoneNo" className="labels">Phone No.</label>
                </div>
                <div className="input-groups">
                    <input 
                        type="number" 
                        id="age" 
                        className="input" 
                        placeholder="" 
                    />
                    <label htmlFor="age" className="labels">Age</label>
                </div>
            </div>
            <Button innerText="Add Contact" />
        </div>
    )
}

export default AddContact;