import React, { useState } from "react";
import Button from "../../ReusableComponents/Button/Button"
import { useNavigate } from "react-router";
import Dashboard from "../DashboardCompo/Dashboard";
import "./AddContact.scss"

const AddContact = ({addContact, user, setFetchingContact}) => {
    const navigate = useNavigate()
    const [ addContactFormData, setAddContactFormData ] = useState({
        name: '',
        phoneNumber: '',
        age: ''
    })

    const handleFormInput = (field, event) => {
        setAddContactFormData({...addContactFormData, [field]: event.target.value})
    }

    const handleAddContact = async () => {
        try {
            const apiData = {
                name: addContactFormData.name,
                phoneNumber: addContactFormData.phoneNumber,
                age: addContactFormData,
                userId: user
            }
            const response = await addContact(apiData);
            if(response.ok === true) {
                navigate('/dashboard')
                setFetchingContact(response)
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