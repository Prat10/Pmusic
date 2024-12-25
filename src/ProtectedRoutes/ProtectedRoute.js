import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { auth } from '../firebaseConfig/firebaseConfig';


const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.user.userID);
  //setTimeout is authenticate users can go login
    setTimeout(()=>{
      if (!user) {
        return <Navigate to="/login" />;
        }
    },3000); 

  return children;
};

export default ProtectedRoute;



















