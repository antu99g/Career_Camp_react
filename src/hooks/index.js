import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

// Custom hook to provide authentication (using context api)
export const useAuth = () => {
   return useContext(AuthContext);
};