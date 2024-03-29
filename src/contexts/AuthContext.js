import React, {createContext, useContext, useState} from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to set user data
  const setUserContext = userData => {
    setUser(userData);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUserContext,
        isAuthenticated,
        setIsAuthenticated,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
