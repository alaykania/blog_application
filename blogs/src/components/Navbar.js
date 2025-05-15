// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function Navbar ()
{
    const { isAuthenticated, logout } = useContext(AuthContext);
    const handleLogout = () => {
        logout(); 
        window.location.href = '/'; 
    };
  return (
    <nav>
      <ul style={{ display: 'flex', listStyle: 'none' }}>
      {!isAuthenticated ? (
                    <>
        <li style={{ marginRight: '20px' }}>
          <Link to="/">Home</Link>
        </li>
       
        <li>
          <Link to="/signin">SignIn</Link>
        </li>
        <li>
          <Link to="/login">LogIn</Link>
        </li>
        </>
      ):(
        <>
         <li>
          <Link to="/">Home</Link>
        </li>
       
        <li>
          <Link to="/create">Create Blog</Link>
        </li>
        <li>
          <Link to="/myblog/:email">My Blog</Link>
        </li>
       
        
        <li>
            <button onClick={handleLogout} style={{backgroundColor:"#333",color:"whitesmoke"}}>Logout</button>
        </li>
        </>
      )}
      </ul>
    </nav>
  );
};

export default Navbar;
