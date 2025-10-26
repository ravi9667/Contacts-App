import React, { useState } from "react";
import show from "../../assets/eye.png"
import hide from "../../assets/hide.png"
import ContactIllustration from "../../assets/contact-illustration.png"
import Button from "../../ReusableComponents/Button/Button"
import { useNavigate } from "react-router";
import Loader from "../../ReusableComponents/Loader/Loader";
import "./login.scss";

const Login = () => {
    const navigate = useNavigate();
    const [ loginApiData, setLoginApiData ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(false)
    const [ isPasswordHidden, setIsPasswordHidden ] = useState(true)
    const [loginFormData, setLoginFormData] = useState({
        email: '',
        password: ''
    })

    const handleFormInput = (field, event) => {
        setLoginFormData({...loginFormData, [field]: event.target.value})
    }

    const showPassword = () => {
        if (isPasswordHidden) {
            setIsPasswordHidden(false);
        } else {
            setIsPasswordHidden(true);
        }
    }

    const handleLogin = async () => {
        setIsLoading(true)
        try {
            const response = await fetch("http://127.0.0.1:5050/login", {
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
                body: JSON.stringify(loginFormData),
            });

            const data = await response.json();
            if(data?.ok) {
                setLoginApiData(data?.data)
                navigate(`/dashboard?userId=${data?.data?.id}`);
            }
        } catch(err) {
            alert("Something went wrong during login !!")
            console.log(err)
        } finally {
            setIsLoading(true)
        }
    }

    return (
        isLoading ? (
            <Loader />
        ) : (
            <div className="login-container">
                <div className="left-image">
                    <h1 className="login-contacts-title">Contacts</h1>
                    <img src={ContactIllustration} alt="Contact-illustration" className="contact-illustration" />
                </div>
                <div className="login-main">
                    <div className="login-card">
                        <h1 className="login-Heading">Login</h1>
                        <div className="input-group group-1">
                            <input 
                                type="email" 
                                className="input" 
                                required 
                                placeholder=" "
                                onChange={(e) => handleFormInput('email', e)}
                                value={loginFormData.email}
                            />
                            <label>Email</label>
                        </div>
                        <div className="input-group group-2">
                            <input 
                                type={isPasswordHidden ? 'password': 'text'} 
                                className="input" 
                                required 
                                placeholder=" "
                                onChange={(e) => handleFormInput('password', e)}
                                value={loginFormData.password}
                            />
                            <label>Password</label>
                            {loginFormData.password.trim().length ? <img src={isPasswordHidden ? hide: show} alt="Eye Icon" onClick={showPassword} className="showIcon"/> : null}
                        </div>
                        <Button innerText="Login" onClick={handleLogin} />
                        <p>Don't have an Account <span onClick={() => navigate('/signup')}>SignUp</span></p>
                    </div>
                </div>
            </div>
        )
    );
}

export default Login;