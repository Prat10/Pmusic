import React, { useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebaseConfig';
import { setUserID } from '../Redux/Features/SaveData/user';

const AuthStateListener = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const { uid } = user;
        dispatch(setUserID({ userID:uid }));
      } else {
        navigate('/login'); // Navigate to login page
      }
    });

    return () => unsubscribe(); // Cleanup listener on component unmount
  }, []);

  return null; // This component doesn't render any UI
};

export default AuthStateListener;
