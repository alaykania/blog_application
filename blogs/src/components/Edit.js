import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/form1.css';

const Blog = () => {
    
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

  
  const handleUpdate = async (e) => {
    e.preventDefault();

    
    const updatedBlog = {
      ...blog,  
      title: updatedTitle,  
      body: updatedBody,  
    };

    try {
      const response = await fetch(`http://localhost:5002/api/blogss/${id}`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedBlog),
      });

      if (response.ok) {
        alert('Blog updated successfully!');
        navigate(`/blog/${id}`); 
      } else {
        alert('Failed to update blog!');
      }
    } catch (error) {
      console.error('Error updating blog:', error);
    }
  };

  if (!blog) return <p>Loading...</p>;

  return (
    <form onSubmit={handleUpdate} name="form">
      <h1 align="center">Edit Blog</h1>
      <div>
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={updatedTitle}
          onChange={(e) => setUpdatedTitle(e.target.value)} 
          required
          placeholder="Enter your title"
        />
      </div>
      <div>
        <label>Description</label>
        <textarea
          name="body"
          value={updatedBody} 
          onChange={(e) => setUpdatedBody(e.target.value)} 
          required
        />
      </div>
      <button type="submit">Update</button>
    </form>
  );
}

export default Blog;