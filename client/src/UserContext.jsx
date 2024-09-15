import React, { useEffect, useState } from "react";
import axios from "axios";
import { createContext } from "react";
import { useLocation } from "react-router-dom";
export const UserContext = createContext({});
export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  useEffect(() => {
    if (!user) {
      axios
        .get("/profile")
        .then(({ data }) => {
          setUser(data);
          setReady(true);
        })
        .catch(() => {
          setUser(null);
          setReady(true);
        });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
