import React, { useState } from 'react';
import '../styles/form.css'
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

function CreateForm ()
{
  
    const [FormData,SetFormData]=useState(
        {
            title:'',
            body:'',
            
            

        });
       
        
        const email = localStorage.getItem('email');
       
    const handleChange=async(e)=>
    {
        const {name,value}=e.target;
        SetFormData({...FormData,[name]:value});
        
 
    }

    const handleSubmit=async(e)=>
    {
        e.preventDefault();

       const dataToSubmit = {
            ...FormData,
            email: email
        };
    try
    {
        const response=await axios.post("http://localhost:5002/api/createform",dataToSubmit);
        if(response.status===200 )
        {
           
            alert(`Blog Uploaded Successfully`);
            
            window.location.href="/";
        }
    }
    catch(error)
        {
            console.error("Error submitting form:", error);
            alert("Failed to Upload Blog ");
        }
      
    }

    return(
        <form onSubmit={handleSubmit} name="form">
            <h1 align="center">Blogs Creation</h1>
            <div>
            <label>Title</label>
            <input type="text" name="title" value={FormData.title} onChange={handleChange} required placeholder="Enter your title"/>
            </div>
            
           
            
            <div>
                <label>Description</label>
                <textarea name="body" value={FormData.body} onChange={handleChange} required>
                </textarea>
            </div>
            <button type="submit">Upload</button>
          
        </form>
       
    )

};
export default CreateForm;
