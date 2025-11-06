import React, { useState, useEffect, createContext, useContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
    email:""
  });
  
  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parsedData = JSON.parse(data);
      // console.log("parsed",parsedData);

      setAuth({
        username: parsedData.username,
        token: parsedData.token,
        email:parsedData.email,
        userId:parsedData.userId
      });
    }
  }, []);
  

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};
const useAuth=()=>useContext(AuthContext)
export { AuthContext, AuthProvider, useAuth };
