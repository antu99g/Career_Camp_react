import { useLayoutEffect, useState } from 'react'; 
import { FaCalendarCheck, FaPlus, FaArrowDown } from "react-icons/fa";
import { fetchAllInterviews } from '../api';
import {Interview} from '../components';
import styles from '../styles/interviews.module.css';

function Interviews () {
   const [interviews, setInterviews] = useState([]);

   const [students, setStudents] = useState([]);

   const [showStudents, setShowStudents] = useState(false);   

   useLayoutEffect(() => {
      (async () => {
         const response = fetchAllInterviews();
         setInterviews(response.interviews);
         setStudents(response.students);
      })();
   }, []);

   return (
      <div>
         <form className={`${styles.interviewForm} ${styles.formBorder}`}>

            <span class="downloadBtn"><a href="/interview/get-interview-details"><FaArrowDown style={{marginRight: 5}} />Download Interview Log</a></span>

            <div>
               <h4 className="interviewFormHeader">Interview Details</h4>
               <p>Company Name <input type="text" name="companyName" required /></p>
               <p>Interview Date <input type="date" name="interviewDate" required /></p>
            </div>

            <div className="addStudentSection">
               <span className="addStudentBtn" onClick={() => setShowStudents(true)}>
                  Add Student
                  <FaPlus/>
               </span>

               {showStudents && (
                  <div className="studentList" class="hidden">
                     {students.map((student) => {
                        return <div className={styles.addStudent} data-id={student._id}>{student.name}</div>
                     })}
                  </div>
               )}
                  

               <span className={styles.addedStudents}></span>
            </div>    

            <button type="submit" className={styles.submitBtn}><FaCalendarCheck/>Create Interview</button>
         </form>


         <div className={styles.allInterviewList}>
            <h2>Interviews</h2>
            
            {/* <% for(let interview of allInterviews){ %> */}
            {interviews.map((interview) => {
               return <Interview interview={interview} />
            })}
               
         </div>
      </div>
   );
}

export default Interviews;