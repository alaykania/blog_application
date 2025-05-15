import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/form1.css';

const DeleteBlog = () => {
    
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState(''); 
  const [updatedBody, setUpdatedBody] = useState(''); 

  const navigate = useNavigate();

  useEffect(() => {
    
    fetch(`http://localhost:5002/api/blogss/${id}`)
      .then(response => response.json())
      .then(data => {
        setBlog(data); 
        setUpdatedTitle(data.title);
        setUpdatedBody(data.body); 
      })
      .catch(error => console.error(error)); 
  }, [id]); 

  
  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5002/api/blogss/delete/${id}`, {
        method: 'DELETE', 
       
      });

      if (response.ok) {
        alert('Blog deleted  successfully!');
        navigate(`/`);  
      } else {
        alert('Failed to delete blog!');
      }
    } catch (error) {
      console.error('Error delete blog:', error);
    }
  };

  if (!blog) return <p>Loading...</p>; 

  return (
    <form onSubmit={handleDelete} name="form">
      <h1 align="center">Delete Blog</h1>
      <div>
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={blog.title} 
         
          required
          placeholder="Enter your title"
          disabled
        />
      </div>
      <div>
        <label>Description</label>
        <textarea
          name="body"
          value={blog.body} 
       
          required
          disabled
        />
      </div>
      <button type="submit">Confirm Delete</button>
    </form>
  );
}

export default DeleteBlog;