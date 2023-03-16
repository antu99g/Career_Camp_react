import {Routes, Route, Navigate} from 'react-router-dom';
import Navbar from "./Navbar";
import { Home, Login, Signup, Interviews } from "../pages";
import {useAuth} from '../hooks';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PrivateRoute = ({children}) => {
   const auth = useAuth();

   // If authorized load the component
   if(auth.authorized){
      return children;
   }

   // If not authorized redirect to login-page
   return <Navigate to='/login' />
}

// Basic error page for 404 status
const Page404 = () => {
   return (
      <>
         <h1 style={{ textAlign: "center", marginTop: 100 }}>404</h1>
         <h1 style={{ textAlign: "center" }}>Page not found</h1>
      </>
   );
};

export default function App() {
   const auth = useAuth();
   
   return (
      <div>
         <Navbar />

         {/* Initializaation for notifications  */}
         <ToastContainer
            autoClose={2000}
            newestOnTop={false}
            closeOnClick={true}
            theme="colored"
            pauseOnHover={false}
            pauseOnFocusLoss={false}
         />

         <Routes>
            <Route
               path="/"
               element={
                  <PrivateRoute>
                     <Home />
                  </PrivateRoute>
               }
            />

            <Route
               path="/login"
               element={auth.authorized ? <Navigate to="/" /> : <Login />}
            />

            <Route
               path="/signup"
               element={auth.authorized ? <Navigate to="/" /> : <Signup />}
            />

            <Route
               path="/interviews"
               element={
                  <PrivateRoute>
                     <Interviews />
                  </PrivateRoute>
               }
            />

            <Route path="*" element={<Page404 />} />
         </Routes>
      </div>
   );
}