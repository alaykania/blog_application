// src/components/Blog.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Blog = () => {
  const { id } = useParams(); // Get the ID from the URL params
  const [blog, setBlog] = useState(null); // Initial state is null, since we expect a single blog object

  useEffect(() => {
    // Fetch the blog data based on the ID
    fetch(`http://localhost:5002/api/blogss/${id}`)
      .then(response => response.json())
      .then(data => setBlog(data)) // Set the single blog data
      .catch(error => console.error(error)); // Handle any fetch errors
  }, [id]); // Dependency array includes 'id' to refetch if the id changes

  if (!blog) return <p>Loading...</p>; // Display a loading message while fetching

  return (
    <div className="blog-list">
          <h2 className="blog-list-title">Blogs</h2>
          <div className="">
              <div key={blog._id} className="blog-card">
                <h3 className="blog-card-title" align="center" style={{fontSize:"30px"}}>{blog.title}</h3>
                <p className="blog-card-snippet">
                {blog.body}
                </p>
               
              </div>
            
          </div>
        </div>
        
  );
}

export default Blog;
