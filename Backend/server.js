import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { ContactsData } from './Models/contactInfo.js';
import { UserData } from './Models/userInfo.js';

try {
    const mongoConnect = mongoose.connect("mongodb://localhost:27017/contacts")
    if(mongoConnect) {
        console.log("DB connected");
    }
} catch {
    console.log("Errorn connecting DB")
}
const app = express();

app.use(express.json())
app.use(cors())

const port = 5050;
const hostName = '127.0.0.1';

app.get("/", (req, res) => {
    res.send("This is Home Tab")
});

app.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.send({
                ok: false,
                message: "All fields are required: name, email, password."
            });
        }

        const existingUser = await UserData.findOne({ email: email });
        if (existingUser) {
            return res.send({
                ok: false,
                message: "Email is already registered. Please log in.",
            });
        }

        const signupData = {
            name,
            email,
            password
        }

        await UserData.create(signupData)

        res.send({
            ok: true,
            message: "signup Successfull"
        })

    } catch(err) {
        console.log(err);
        res.send({
            ok: false,
            message: `Signup Failed`
        })
    }
});

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.send({
                ok: false,
                message: "All fields are required: email, password."
            });
        }

        const result = await UserData.find({email: email, password: password});
        if(!result.length) {
            return res.send({
                ok: false,
                message: 'Email or password is incorrect'
            });
        }

        console.log(result)
        res.status(200).send({
            ok: true,
            message: 'Login SuccessFully',
            data: result[0]._id
        })

    } catch(err) {
        console.log(`login ${err}`);
        res.send({
            ok: true,
            message: "login Failed"
        })
    }
});

app.get("/fetchUser", async (req, res) => {
    try {
        const {userId} = req.query;
        if(!userId) {
            return res.send({
                ok: false,
                message: "UserId is required"
            })
        }

        const result = await UserData.find(
            {
                _id: userId
            },
            {
                _id: 0,
                name: 1,
                email: 1
            }
        );
        console.log(result)
        if (!result.length) {
            return res.send({
                ok: false,
                message: 'userId is incorrect'
            });
        }

        res.status(200).send({
            ok: true,
            data: result[0]
        })

    } catch(err) {     
        console.log("Error fetching user:", err);
        return res.send({
            ok: false,
            message: "failed to fatch User"
        });
    }

});

app.get("/fetchContacts", async (req, res) => {
    try {
        const { userId } = req.query;
        if(!userId) {
            return res.send({
                ok: false,
                message: "UserId is required"
            })
        }

        const result = await ContactsData.find({userId: userId});
        console.log(result)
        if (!result.length) {
            return res.send({
                ok: false,
                message: 'userId is incorrect'
            });
        }

        res.status(200).send({
            ok: true,
            data: result
        })

    } catch(err) {
        console.log(err)
        return res.send({
            ok: false,
            message: "Failed to fetch Contacts"
        });
    }
});

app.post("/addContact", async (req, res) => {
    try {
        const { name, phoneNumber, age, userId } = req.body;

        if (!name || !phoneNumber || !age || !userId) {
            return res.send({
                ok: false,
                message: "All fields are required: name, phoneNumber, age."
            });
        }

        const existingContact = await ContactsData.find({phoneNumber: phoneNumber, userId: userId});
        if (existingContact.length > 0) {
            return res.send({
                ok: false,
                message: "Contact Already Exists",
            });
        }

        const contactData = {
            name,
            phoneNumber,
            age,
            userId
        }

        const addContact = await ContactsData.create(contactData);
        res.status(200).send({
            ok: true,
            message: "Contact Added Successfully",
            data: addContact[0]
        });
    } catch(err) {
        console.log(err)
        return res.send({
            ok: false,
            message: "Failed to add Contact"
        });
    }
});

app.delete("/deleteContact", async (req, res) => {
    try {
        const {contactId} = req.body;
        if(!contactId) {
            return res.send({
                ok: false,
                message: "contactId is required"
            })
        }

        const deleteContact = await ContactsData.deleteOne({_id: contactId});
        if (deleteContact.deletedCount === 1) {
            return res.status(200).send({
                ok: true,
                message: "Contact Deleted Successfully"
            })

        }

    } catch(err) {
        console.log(err)
        return res.send({
            ok: false,
            message: "Failed to delete contact"
        });
    }
})

app.listen(port, hostName, () => {
    console.log(`Server is running on http://${hostName}:${port}`)
})