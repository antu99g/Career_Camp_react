import { useLayoutEffect, useState } from "react";
import { fetchAllStudents } from "../api";
import { FaAngleDown, FaAngleUp, FaCheck, FaPlus } from "react-icons/fa";
import styles from '../styles/interviews.module.css';

function Interview ({interview}) {
   const [students, setStudents] = useState([]);

   const [showStudents, setShowStudents] = useState(false);

   useLayoutEffect(() => {
      (async () => {
         const response = fetchAllStudents();
         setStudents(response.students);
      })();
   }, [])

   return (
      <div className={styles.eachInterview}>
         <p>Company Name: {interview.companyName}</p>
         <p>Interview Date: {interview.interviewDate}</p>

         <form action="/interview/add-student" method="post">
            <select name="studentId">
               <option>--Add a student--</option>
               {students.map((student) => {
                  return <option value={student._id}>{student.name}</option>;
               })}
            </select>

            <input type="hidden" name="interviewId" value={interview._id} />

            <button type="submit" className={styles.submitBtn}>
               <FaPlus />
               Add
            </button>
         </form>

         <span className={styles.arrowDown}>
            {showStudents ? (
               <FaAngleUp onClick={() => setShowStudents(false)} />
            ) : (
               <FaAngleDown onClick={() => setShowStudents(true)} />
            )}
         </span>

         {showStudents &&
            (interview.students.length < 1 ? (
               <div style={{ color: "grey", margin: "5px 8px" }}>
                  No students added...
               </div>
            ) : (
               <ul className={styles.listOfStudents}>
                  {/* <% for(let student of interview.students){ %> */}
                  {interview.students.map((student) => {
                     return (
                        <li>
                           <p>
                              {student.candidate.name}
                              <small className={styles.intStatus}>
                                 {student.interviewStatus}
                              </small>
                           </p>
                           <small>{student.candidate.college}</small>

                           <form action="/interview/set-status" method="post">
                              <input
                                 type="hidden"
                                 name="interviewId"
                                 value={interview.id}
                              />
                              <input
                                 type="hidden"
                                 name="studentId"
                                 value={student.candidate.id}
                              />
                              <select name="interviewStatus">
                                 <option value="On hold">On hold</option>
                                 <option value="Pass">Pass</option>
                                 <option value="Fail">Fail</option>
                                 <option value="Not Attended">
                                    Not Attended
                                 </option>
                              </select>
                              <button
                                 type="submit"
                                 class="submitBtn interviewStatus"
                              >
                                 <FaCheck />
                                 Save
                              </button>
                           </form>
                        </li>
                     );
                  })}
               </ul>
            ))}
      </div>
   );
}

export default Interview;