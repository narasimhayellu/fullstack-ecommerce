import React, { useContext, useState } from 'react';
import "./Signup.css"
import { Link } from 'react-router-dom';
import { AuthContext } from '../../auth/auth-context';
import { Button } from '@mui/material';

const Signup = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

    const {signUp} = useContext(AuthContext);

    const onHandleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormData({...formData, [name]: value});
    }

    const submitHandler = (event) => {
        event.preventDefault()
        signUp(formData);
        console.log(formData);
    }
  
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
                </div>
                <div className="form-group">
                    <label>Last name</label>
                    <input onChange={onHandleChange} name="lastName" type="text" placeholder="Enter your last name" required/>
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input onChange={onHandleChange} name="email" type="email" placeholder="Enter your email id" required/>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input onChange={onHandleChange} name="password" type="password" placeholder="Enter your password" required/>
                </div>
                <Button variant='contained' color='primary' type='submit'>Signup</Button>
            </form>
        </div>
        </div> 
        
        </>
    )
}

export default Signup;