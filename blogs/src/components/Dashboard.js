
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserDashboard = () => {
    const [blogs, setBlogs] = useState([]);
    const userId = localStorage.getItem('userId'); 

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(`/api/blogs/user/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setBlogs(response.data.data);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };

        fetchBlogs();
    }, [userId]);

    return (
        <div>
            <h1>Your Blogs</h1>
            <ul>
                {blogs.map(blog => (
                    <li key={blog._id}>{blog.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default UserDashboard;