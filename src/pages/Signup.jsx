import { useRef } from 'react';
import styles from '../styles/loginSignup.module.css';
import { Link, Navigate, useNavigate } from "react-router-dom";
import {signup} from '../api';
import { useAuth } from '../hooks';
import { toast } from "react-toastify";


function Signup () {
   const idRef = useRef(); // collecting email from input

   const usernameRef = useRef(); // collecting username from input

   const passwordRef = useRef(); // collecting password from input

   const cPasswordRef = useRef(); // collecting confirm-password from input

   const auth = useAuth(); // data of logged user (using context api)

   const navigate = useNavigate();


   // Function for sign-up a new user
   const handleFormSubmit = async (e) => {
      e.preventDefault();
      if (cPasswordRef.current.value !== passwordRef.current.value) { // if password doesn't match with confirm-password
         e.target.reset();
         toast.error("Error in username/password");
         return;
      } else {
         await signup(idRef.current.value, usernameRef.current.value, passwordRef.current.value);
         toast.success('New user created!');
         navigate("/login");
      }
   };


   // Navigate to homepage if user already logged-in
   if (auth.user) {
      return <Navigate to="/" />;
   }



   return (
      <div className={styles.formContainer}>
         <h1 className={styles.logo}>Career Camp</h1>

         <h3>Sign Up</h3>

         <form onSubmit={handleFormSubmit}>
            <p>Employee Id</p>
            <input type="number" ref={idRef} placeholder="Your id.." required />
            <p>Password</p>
            <input
               type="password"
               ref={passwordRef}
               placeholder="Password..."
               required
            />
            <p>Confirm Password</p>
            <input
               type="password"
               name="confirmpassword"
               ref={cPasswordRef}
               placeholder="Confirm..."
               required
            />

            <button type="submit" className={styles.orangeBtn}>
               Sign Up
            </button>
         </form>

         <Link to="/login">Already have an account? Log in</Link>
      </div>
   );
}

export default Signup;