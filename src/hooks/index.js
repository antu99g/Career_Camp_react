import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";

// Custom hook to provide authentication (using context api)
export const useAuth = () => {
   return useContext(AuthContext);
};

// Custom hook for delete confirmation
export const useDelete = () => {
   const [confirmDelete, setConfirmDelete] = useState(false);

   const handleDeleteClick = (state) => {
      if(typeof state === 'boolean'){
         setConfirmDelete(state);
      } else {
         setConfirmDelete(!confirmDelete);
      }
   }

   return [confirmDelete, handleDeleteClick];
};