import { createContext, useState, useEffect } from "react";
import { login as loginReq } from "../api";
import { toast } from "react-toastify";

const initialState = {
   authorized: false,
   login: () => {},
   logout: () => {}
};

export const AuthContext = createContext(initialState);

export const AuthProvider = ({ children }) => {
   const [authorized, setAuthorized] = useState(false);

   // Fetching data of logged user (from localstorage)
   // useEffect(() => {
   //    let currentUser = localStorage.getItem('USER_DATA');
   //    currentUser = JSON.parse(currentUser) || null;
   //    setUser(currentUser);
   // }, []);
   

   // API call for logging-in
   const login = async (email, password) => {
      let res = await loginReq(email, password);
      if(res.success){
         let token = res.token ? String(res.token) : null;

         localStorage.setItem('TOKEN_KEY', token);
         // setUser(res.user);
         setAuthorized(true);
         toast.success("Logged in successfully!");
      } else {
         toast.error('Error in username/password');
      }
   };


   // Function for log-out
   const logout = () => {
      localStorage.setItem("TOKEN_KEY", null);
      setAuthorized(false);
      toast('Logged out!')
   };
   

   const utils = { authorized, login, logout };

   return (
      <AuthContext.Provider value={utils}>
         {children}
      </AuthContext.Provider>
   );
}