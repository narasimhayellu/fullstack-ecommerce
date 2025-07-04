import { useContext, useState } from 'react';
import "./Login.css"
import { AuthContext } from '../../auth/auth-context';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

const Login = () => {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    
    const {login} = useContext(AuthContext);
    const [errors, setErrors] = useState({});

    const onHandleChange = (event) => {
     
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    
        // Live validation
        if (name === "email") {
          if (!/^[\w.-]+@[\w.-]+\.\w{2,}$/.test(value)) {
            setErrors(prev => ({ ...prev, email: "Invalid email format" }));
          } else {
            setErrors(prev => ({ ...prev, email: "" }));
          }
        }
    
        if (name === "password") {
          if (value.length < 6) {
            setErrors(prev => ({ ...prev, password: "Password must be at least 6 characters" }));
          } else {
            setErrors(prev => ({ ...prev, password: "" }));
          }
        }
        
    }

    const submitHandler = (event) => {
        event.preventDefault()
        const newErrors = {};

        // Final check before submit
        if (!formData.email) {
          newErrors.email = "Email is required";
        } else if (!/^[\w.-]+@[\w.-]+\.\w{2,}$/.test(formData.email)) {
          newErrors.email = "Invalid email format";
        }
    
        if (!formData.password) {
          newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
          newErrors.password = "Password must be at least 6 characters";
        }
    
        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {
            login(formData);
          }
    }
    
    return (
        <>
        <div className='round d-flex'>
        <img className='img' src="https://img.freepik.com/free-vector/tablet-login-concept-illustration_114360-7883.jpg?t=st=1733219991~exp=1733223591~hmac=7a6f236e3dd7b6fd3a24d20da945a3181925cf689de02a750e87c6f06143c5bc&w=1060" alt="" />
        <div className="form-container">
            <h1>Login Form</h1>
            <form onSubmit={submitHandler}>
                <div className="form-group">
                    <label>Email</label>
                    <input onChange={onHandleChange} name="email" type="email" placeholder="Enter your email id" required/>
                    {errors.email && <p className="error">{errors.email}</p>}
                </div>
                <div  className="form-group">
                    <label>Password</label>
                    <input onChange={onHandleChange} name="password" type="password" placeholder="Enter your password" required/>
                    {errors.password && <p className="error">{errors.password}</p>}
                </div>
                <Button color="primary" variant="contained" type='submit'>Login</Button>
                <div className='mt-3'>
                    <h5>Don't have an account? <Link style={{color:'darkred'}} to="/signup">Sign up</Link> </h5>
                </div>
            </form>
        </div>
        </div>
        </>
    )
}

export default Login;

