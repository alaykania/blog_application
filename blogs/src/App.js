// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import BlogList from './components/BlogList';
import Blog from './components/Blog';
import { AuthProvider } from './context/AuthContext';
import Footer from './components/Footer';
import Login from './components/Login';
import FormComponent from './components/Form';
import CreateForm from './components/Createform';

import MyBlogList from './components/MyBlog';
import Edit from './components/Edit';
import DeleteBlog from './components/Delete';
import PrivateRoute from './components/PrivateRoutes';

function App() {
  return (
    <AuthProvider>
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<BlogList />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/signin" element={<FormComponent />} />
          <Route path="/login" element={<Login />} />
          
          {/* Protected routes */}
          <Route path="/create" element={
            <PrivateRoute>
              <CreateForm />
            </PrivateRoute>
          } />
         
          <Route path="/myblog/:email" element={
            <PrivateRoute>
              <MyBlogList />
            </PrivateRoute>
          }/>
          <Route path="/edit/:id" element={
            <PrivateRoute>
              <Edit />
            </PrivateRoute>
          }/>
          <Route path="/delete/:id" element={
            <PrivateRoute>
              <DeleteBlog />
            </PrivateRoute>
          }/>
        </Routes>
      </div>
      <Footer/>
    </Router>
    </AuthProvider>
  );
}

export default App;
