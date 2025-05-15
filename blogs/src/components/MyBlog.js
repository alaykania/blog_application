import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BlogList from './BlogList';

function MyBlogList() {
    const [blogs, setBlogs] = useState([]);
    const email = localStorage.getItem('email'); 
  
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(`http://localhost:5002/api/myblogs/${email}`); // Call the API endpoint
                setBlogs(response.data); 
            } catch (error) {
                console.error("Error fetching blogs:", error);
            }
        };

     

        fetchBlogs(); 
    }, [email]);

   return (
       <div className="blog-list">
         <h2 className="blog-list-title">Latest Blogs</h2>
         <div className="blog-cards-container">
           {blogs.map((blog) => (
             <div key={blog._id} className="blog-card">
               <h3 className="blog-card-title">{blog.title}</h3>
               <p className="blog-card-snippet">
                 {blog.body.slice(0,90)}
               </p>
               <Link to={`/edit/${blog._id}`} className="read-more-link">
                Edit
                </Link>
                <Link  to={`/delete/${blog._id}`}className="read-more-link" style={{marginLeft:"10px"}}>
                Delete
                </Link>
              
             </div>
           ))}
         </div>
       </div>
     );
}

export default MyBlogList;