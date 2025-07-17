import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_AUTH_API_URL}/auth/me`, {
          withCredentials: true, 
        });

        setUser({
          name: response.data.name,
          token: response.data.token,
        });
      } catch (error) {
        console.error('שגיאה בשליפת המשתמש מהשרת:', error.response?.data || error.message);
        setUser(null); 
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};
