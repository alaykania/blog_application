import React, { useState} from 'react';
import '../styles/form.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
function Login()
{
    const { login } = useContext(AuthContext);
    const [FormData,SetFormData]=useState(
        {
           
            email:'',
            password:'',
        });
const navigate=useNavigate();
    const handleChange=async(e)=>
    {
        const {name,value}=e.target;
        SetFormData({...FormData,[name]:value});

    }

    const handleSubmit=async(e)=>
    {
        e.preventDefault();

    
  
    try
    {
        const response=await axios.post("http://localhost:5002/api/login",FormData);
        if(response.status===200)
        {
            localStorage.setItem("authToken", response.data.token);
           localStorage.setItem("email",FormData.email);
            alert("data  login successfully");
           login(response.data.token);
            navigate("/");
           
        }
    
    } 
    
    catch(error)
        {
           
            alert("Invalid Credentials");
        }
      
    }
    
    return(
        <form onSubmit={handleSubmit} name="form">
            <h1 align="center">Login Registration</h1>
            
            <div>
            <label>Email</label>
            <input type="email" name="email" value={FormData.email} onChange={handleChange} required placeholder="Enter your email"/>
            </div>
           
            <div>
                <label>Password</label>
                <input type="password" name="password" value={FormData.password} onChange={handleChange} required placeholder="Enter your paasword"/>
            </div>
            
            <button type="submit">Submit</button>
            <div>
                <a href="/signin">Registration for new user</a>
            </div>
        </form>
       
    )

}
export default Login;
