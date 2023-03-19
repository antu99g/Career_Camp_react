import {Link} from 'react-router-dom';
import { useAuth } from '../hooks';
import {FiLogOut} from 'react-icons/fi';
import styles from '../styles/navbar.module.css';

function Navbar () {
   const auth = useAuth(); // hook for consuming authentication status

   // show navbar only if authenticated
   // hidden for login and signup page
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
               <Link to="" onClick={() => auth.logout()}><FiLogOut className={styles.logoutIcon} />Log Out</Link>
            </span>
         </nav>
      );
   }
}

export default Navbar;