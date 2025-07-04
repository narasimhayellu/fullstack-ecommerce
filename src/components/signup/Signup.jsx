import React, { useContext, useState } from 'react';
import "./Signup.css"
import { Link } from 'react-router-dom';
import { AuthContext } from '../../auth/auth-context';
import { Button } from '@mui/material';
import axios from 'axios';

const Signup = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

    const {signUp} = useContext(AuthContext);
    const [errors, setErrors] = useState({});


    const onHandleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    
        // Field-specific validation
        let errorMsg = "";
    
        switch (name) {
            case "firstName":
            case "lastName":
                if (!value.trim()) {
                    errorMsg = `${name === "firstName" ? "First" : "Last"} name is required`;
                } else if (value.length < 2) {
                    errorMsg = `${name === "firstName" ? "First" : "Last"} name must be at least 2 characters`;
                } else if (value.length > 50) {
                    errorMsg = `${name === "firstName" ? "First" : "Last"} name cannot exceed 50 characters`;
                }
                break;
            case "email":
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!value.trim()) {
                    errorMsg = "Email is required";
                } else if (!emailRegex.test(value)) {
                    errorMsg = "Invalid email format";
                }
                break;
            case "password":
                if (!value.trim()) {
                    errorMsg = "Password is required";
                } else if (value.length < 6) {
                    errorMsg = "Password must be at least 6 characters";
                }
                break;
            default:
                break;
        }
    
        setErrors((prev) => ({
            ...prev,
            [name]: errorMsg,
        }));
    };
    

    const submitHandler = (event) => {
        event.preventDefault();
    
        // Check for any validation errors before submitting
        const hasErrors = Object.values(errors).some((msg) => msg);
        if (hasErrors) {
            alert("Please fix the validation errors before submitting.");
            return;
        }
    
        signUp(formData);
    };
  
    return (
        <>
        <div className='round d-flex'>
        <img className='image' src="https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-27396.jpg?t=st=1731325924~exp=1731329524~hmac=a875dfe205e6ab17504a011e9cd2738db6d8f7e5ffb0ef2b3eaf0732daec440d&w=1060" alt="" />    
        <div className="form-container">
            <h1>Signup Form</h1>
            <form onSubmit={submitHandler}>
               <div className="form-group">
                    <label>First name</label>
                    <input onChange={onHandleChange} name="firstName" type="text" placeholder="Enter your first name" required/>
                    {errors.firstName && <p className="error">{errors.firstName}</p>}
                </div>
                <div className="form-group">
                    <label>Last name</label>
                    <input onChange={onHandleChange} name="lastName" type="text" placeholder="Enter your last name" required/>
                    {errors.lastName && <p className="error">{errors.lastName}</p>}
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input onChange={onHandleChange} name="email" type="email" placeholder="Enter your email id" required/>
                    {errors.email && <p className="error">{errors.email}</p>}
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input onChange={onHandleChange} name="password" type="password" placeholder="Enter your password" required/>
                    {errors.password && <p className="error">{errors.password}</p>}
                </div>
                <Button variant='contained' color='primary' type='submit'>Signup</Button>
            </form>
        </div>
        </div> 
        
        </>
    )
}

export default Signup;