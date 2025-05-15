import React, { useState } from 'react';
import '../styles/form.css'
import axios from 'axios';
function FormComponent()
{
    const [FormData,SetFormData]=useState(
        {
            name:'',
            email:'',
            number:'',
            password:'',
            confirmpassword:''

        });
        const [UserExists,SetUserExists]=useState(false);
        

    const handleChange=async(e)=>
    {
        const {name,value}=e.target;
        SetFormData({...FormData,[name]:value});

      
        if(name==='email' || name==='number')
        {
            try
            {
            const response=await axios.post("http://localhost:5002/api/users",
                {
                  email: FormData.email,
                  number:FormData.number,

                });
            if(response.status===200)
            {
               
                SetUserExists(response.data.userExists);

            }
        }
            catch(error)
            {
                console.error("Error checking user existence:", error);
                alert("Failed to check if the user exists.");
            }
          

        }
        

    }

    const handleSubmit=async(e)=>
    {
        e.preventDefault();

        if(UserExists)
        {
            alert("User already exists");
           
           
            return;
        }
         if(FormData.password!==FormData.confirmpassword)
            {
                alert("password does not match please check");
              
                return;
            
            }
    try
    {
        const response=await axios.post("http://localhost:5002/api/form",FormData);
        if(response.status===200)
        {
            alert("data registered successfully");
            window.location.href="login";
        }
    }
    catch(error)
        {
            console.error("Error submitting form:", error);
            alert("Data failed to submit");
        }
      
    }

    return(
        <form onSubmit={handleSubmit} name="form">
            <h1 align="center">Form Registration</h1>
            <div>
            <label>Name</label>
            <input type="text" name="name" value={FormData.name} onChange={handleChange} required placeholder="Enter your name"/>
            </div>
            
            <div>
            <label>Email</label>
            <input type="email" name="email" value={FormData.email} onChange={handleChange} required placeholder="Enter your email"/>
            </div>
            <div>
            <label>Number</label>
            <input type="number" name="number" value={FormData.number} onChange={handleChange} required placeholder="Enter your number"/>
            </div>
            <div>
                <label>Password</label>
                <input type="password" name="password" value={FormData.password} onChange={handleChange} required placeholder="Enter your password"/>
            </div>
            <div>
                <label>Confirm Password</label>
                <input type="password" name="confirmpassword" value={FormData.confirmpassword} onChange={handleChange} required placeholder="Enter your password"/>
            </div>
            <button type="submit">Submit</button>
            <div>
                <a href="/login" name="reg">Already registered</a>
            </div>
        </form>
       
    )

}
export default FormComponent;
