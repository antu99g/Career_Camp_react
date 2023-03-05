import {Link} from 'react-router-dom';
import { useAuth } from '../hooks';
import styles from '../styles/navbar.module.css';

function Navbar () {
   const auth = useAuth();

   if(auth.authorized){
      return (
         <nav className={styles.nav}>
            <span>
               <h2>Career Camp</h2>
               <Link to="/">Students</Link>
               <Link to="/interviews">Interview</Link>
               <Link to="">Jobs</Link>
            </span>
            <span>
               <Link to="/user/logout">Log Out</Link>
            </span>
         </nav>
      );
   }
}

export default Navbar;