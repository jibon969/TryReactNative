import React, {createContext, useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '../api/api';

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mainLoader, setMainLoader] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated
    const checkAuthentication = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        setUser(token); // Assuming user data is just the token for simplicity
        setIsAuthenticated(true);
      }
      setMainLoader(false);
    };

    checkAuthentication();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        mainLoader,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
