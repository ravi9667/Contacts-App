import mongoose from "mongoose";

const contactsSchema = mongoose.Schema({
    name: {
        type: String,
        lowercase: true,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    contactId: {
        type: String,
    }
});

export const ContactsData = mongoose.model("contactsData", contactsSchema);