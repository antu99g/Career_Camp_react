import { createContext, useState, useEffect } from "react";
import { login as loginReq } from "../api";
import { toast } from "react-toastify";


// Initial state with utility functions
const initialState = {
   authorized: false,
   login: () => {},
   logout: () => {}
};

export const AuthContext = createContext(initialState);


// Providing authentication context to children

export const AuthProvider = ({ children }) => {
   // state containing authentication status
   const [authorized, setAuthorized] = useState(false);

   // Fetching login status on refreshing page
   useEffect(() => {
      // fetching jwt from localstorage
      const token = window.localStorage.getItem("CAREER_CAMP_TOKEN_KEY");
      if (token) {
         setAuthorized(true);
      }
   }, []);

   // API call for logging-in
   const login = async (employeeId, password) => {
      let res = await loginReq(employeeId, password); // api call for login
      if (res.success) {
         let token = res.token ? String(res.token) : null;

         localStorage.setItem("CAREER_CAMP_TOKEN_KEY", token); // storing jwt in localstorage
         setAuthorized(true);
         toast.success("Logged in successfully!");
      } else {
         toast.error("Error in username/password");
      }
   };

   // Function for logging-out
   const logout = () => {
      localStorage.setItem("CAREER_CAMP_TOKEN_KEY", null); // removing jwt from localstorage
      setAuthorized(false);
      toast.info("Logged out!");
   };

   const utils = { authorized, login, logout };

   return <AuthContext.Provider value={utils}>{children}</AuthContext.Provider>;
}