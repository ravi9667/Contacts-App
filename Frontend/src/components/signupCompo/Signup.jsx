import React, {useState} from "react";
import show from "../../assets/eye.png"
import hide from "../../assets/hide.png"
import ContactIllustration from "../../assets/contact-illustration.png"
import Button from "../../ReusableComponents/Button/Button"
import { useNavigate } from "react-router";
import './Signup.scss'

const SignUp = ({signup}) => {
    const navigate = useNavigate()
    const [ isPasswordHidden, setIsPasswordHidden ] = useState(true)
    const [signupFormData, setSignupFormData] = useState({
        name: '',
        email: '',
        password: ''
    })
    const handleFormInput = (field, event) => {
        setSignupFormData({...signupFormData, [field]: event.target.value})
    }
    const showPassWord = () => {
        if (isPasswordHidden) {
            setIsPasswordHidden(false);
        } else {
            setIsPasswordHidden(true);
        }
    }

    const handleSignup = async () => {
        try {
            const response = await signup(signupFormData);

            if(response.ok === true) {
                navigate('/')
            } else {
                alert(response.message, "SignUp Failed")
            }
        } catch(err) {
            alert("Something went wrong during SignUp !!")
            console.log(err)
        }
    }

    return (
        <div className="signup-container">
            <div className="left-image">
                <h1 className="signup-contacts-title">Contacts</h1>
                <img src={ContactIllustration} alt="Contact-illustration" className="contact-illustration" />
            </div>
            <div className="signup-main">
                <div className="signup-card">
                    <h1 className="signup-Heading">Sign Up</h1>
                    <div className="input-group group-1">
                       <input 
                            type="text" 
                            className="input" 
                            required 
                            placeholder=" "
                            onChange={(e) => handleFormInput('name', e)}
                            value={signupFormData.name}
                        /> 
                        <label>Name</label>
                    </div>
                    <div className="input-group group-2">
                        <input 
                            type="email" 
                            className="input" 
                            required 
                            placeholder=" "
                            onChange={(e) => handleFormInput('email', e)}
                            value={signupFormData.email}    
                        />
                        <label>Email</label>
                    </div>
                    <div className="input-group group-3">
                        <input 
                            type={isPasswordHidden ? 'password': 'text'} 
                            className="input" 
                            required 
                            placeholder=" "
                            onChange={(e) => handleFormInput('password', e)}
                            value={signupFormData.password}
                        />
                        <label>Password</label>
                        {signupFormData.password.trim().length ? <img src={isPasswordHidden ? hide: show} alt="Eye Icon" onClick={showPassWord} className="showIcon"/> : null}
                    </div>
                    <Button innerText="SignUp" onClick={handleSignup} />
                    <p>Already have an Account <span onClick={() => navigate('/')}>Login</span></p>
                </div>
            </div>
        </div>
    )
}

export default SignUp;