import { useLayoutEffect, useRef, useState } from "react";
import { fetchAllStudents, addNewStudent } from "../api";
import styles from '../styles/home.module.css';
import {FaArrowDown, FaPlus} from 'react-icons/fa';

function Home () {
   const [students, setStudents] = useState([]);

   useLayoutEffect(() => {
      (async () => {
         const response = await fetchAllStudents();
         setStudents(response.students);
      })();
   }, []);


   const handleAddNewStudent = async (e) => {
      e.preventDefault();
      const response = await addNewStudent();
   }

   return (
      <div>
         <button className={styles.downloadBtn}><FaArrowDown />Download Students Log</button>

         <form onSubmit={handleAddNewStudent}>
            <div>
               <div>
                     <h5>Student Details</h5>
                     <p>Name <input type="text" name="name" required /></p>
                     <p>Batch <input type="text" name="batch" required /></p>
                     <p>College <input type="text" name="college" required /></p>
               </div>
            
               <div>
                     <h5>Course Scores</h5>
                     <p>DSA <input type="number" name="dsaScore" /></p>
                     <p>Web Development <input type="number" name="webdScore" /></p>
                     <p>React <input type="number" name="reactScore" /></p>
               </div>
            
               <div>
                     <h5>Placement Status</h5>
                     <div>
                        <input type="radio" name="placementStatus" value="Placed" id="placed" />
                        <label for="placed">Placed</label>
                     </div>
                     <input type="radio" name="placementStatus" value="Not placed" id="notPlaced" />
                     <label for="notPlaced">Not Placed</label>
               </div>
            </div>

            <button type="submit" className={styles.submitBtn}><FaPlus/>Add Student</button>
         </form>


         <h2 className={styles.studentHeader}>Students</h2>

         <div className={styles.allStudentList}>
            {students.map((student) => {
               return (
                  <div>
                        <span>
                           <p className={styles.name}>{student.name}</p>
                           <p className={styles.college}>{student.college}</p>
                        </span>
                        <span>
                           <p className={styles.batch}>Batch: {student.batch}</p>
                           <small className={styles.pStatus}>{student.placementStatus}</small>
                        </span>
                  </div>
               );
            })}            
         </div>
      </div>
   );
}

export default Home;