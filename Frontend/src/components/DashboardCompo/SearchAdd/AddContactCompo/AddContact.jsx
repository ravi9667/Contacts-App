import React, { useState } from "react";
import Button from "../../../../ReusableComponents/Button/Button";
import "./AddContact.scss";

const AddContact = ({ userId, onClose, onContactAdded }) => {
    const [formData, setFormData] = useState({
        name: "",
        phoneNumber: "",
        age: "",
    });

    const handleFormInput = (field, e) => {
        setFormData({ ...formData, [field]: e.target.value });
    };

    const addContact = async (data) => {
        const res = await fetch("http://127.0.0.1:5050/addContact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        return res.json();
    };

    const handleAddContact = async () => {
        try {
            const payload = { ...formData, userId };
            const res = await addContact(payload);

            if (res.ok) {
                onContactAdded(res.data);
            } else {
                alert(res.message || "Failed to add contact");
            }
        } catch (err) {
            alert("Something went wrong");
            console.error(err);
        }
    };

    return (
        <div className="addContact-cont">
            <p className="cancel-btn" onClick={onClose}>✖</p>
            <h1 className="addContact-heading">Add Contact</h1>

            <div className="input-box">
                <div className="input-groups">
                    <input
                        type="text"
                        id="name"
                        className="input"
                        placeholder=" "
                        onChange={(e) => handleFormInput("name", e)}
                    />
                    <label htmlFor="name" className="labels">Name</label>
                </div>
                <div className="input-groups">
                    <input
                        type="number"
                        id="phoneNo"
                        className="input"
                        placeholder=""
                        onChange={(e) => handleFormInput("phoneNumber", e)}
                    />
                    <label htmlFor="phoneNo" className="labels">Phone No.</label>
                </div>
                <div className="input-groups">
                    <input
                        type="number"
                        id="age"
                        className="input"
                        placeholder=""
                        onChange={(e) => handleFormInput("age", e)}
                    />
                    <label htmlFor="age" className="labels">Age</label>
                </div>
            </div>

            <Button innerText="Add Contact" onClick={handleAddContact} />
        </div>
    );
};

export default AddContact;