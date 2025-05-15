// src/components/BlogList.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const BlogList = () => {
  
 const [blog, setBlog] = useState([]);
 
   useEffect(()=>
     {
         fetch("http://localhost:5002/api/blogs")
         .then(response=>response.json())
         .then(data=>setBlog(data))
         .catch(error=>console.error(error)
         )
 
 
     },[]);

  return (
    <div className="blog-list">
      <h2 className="blog-list-title">Latest Blogs</h2>
      <div className="blog-cards-container">
        {blog.map((blogs) => (
          <div key={blogs._id} className="blog-card">
            <h3 className="blog-card-title">{blogs.title}</h3>
            <p className="blog-card-snippet">
              {blogs.body.slice(0,90)}
            </p>
            <Link to={`/blog/${blogs._id}`} className="read-more-link">
              Read More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
