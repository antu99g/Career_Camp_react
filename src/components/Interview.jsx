import { useEffect, useState } from "react";
import { fetchAllStudents, addStudentToInterview, changeStatus } from "../api";
import { useDelete } from "../hooks";
import styles from '../styles/interviews.module.css';
import { FaAngleDown, FaAngleUp, FaCheck, FaPlus, FaRegTimesCircle } from "react-icons/fa";
import { toast } from "react-toastify";

function Interview({ interview, handleDeleteInterview }) {
   // List of all students sheduled for interview
   const [candidates, setCandidates] = useState(interview.students);

   // List of ids of all candidates of this interview
   const [candidateId, setCandidateID] = useState(() =>
      interview.students.map((student) => student.candidate._id)
   );

   // Students who are not sheduled for this interview
   const [availableStudents, setAvailableStudents] = useState([]);

   // Show/hide students list in interview card
   const [showStudents, setShowStudents] = useState(false);

   // Confirmation list before deleting an interview
   const [confirmDelete, handleDeleteClick] = useDelete();
   

   useEffect(() => {
      (async () => {
         const response = await fetchAllStudents();
         // fetching all students who are not included in this interview
         let studentsToAdd = response.students.filter(
            (student) => !candidateId.includes(student._id)
         );
         setAvailableStudents(studentsToAdd);
      })();
   }, [candidateId]);


   // Function for giving different colors to different interview-statuses
   const statusColor = (status) => {
      const colors = {
         "On hold": "orange",
         "Pass": "green",
         "Fail": "red",
         "Not Attended": "orangered",
      };
      return { color: colors[status] };
   };


   // Function for adding new student to an interview
   const handleAddStudent = async (e) => {
      e.preventDefault();
      const { target } = e;

      if (target[0].value === "--Add a student--") { // if no student is selected
         toast.warning("Please select a student");
         return;
      }

      let formBody = {}; // collecting all formdata in an object
      for (let i = 0; i < target.length; i++) {
         if (target[i].type !== "submit") {
            let key = target[i].name;
            let value = target[i].value;
            formBody[key] = value;
         }
      }
      const response = await addStudentToInterview(formBody); // api call to add student
      if (response.success) {
         setCandidates([...candidates, response.newStudent]); // add new student to candidates-list
         setCandidateID([...candidateId, response.newStudent._id]); // add new student-id to all candidates-id list
         toast.success("Student added successfully");
      } else {
         toast.error("Error in adding student");
      }
   };


   // Function for adding new student to an interview
   const handleChangeStatus = async (e) => {
      e.preventDefault();
      const { target } = e;

      let formBody = {}; // collecting all formdata to an object
      for (let i = 0; i < target.length; i++) {
         if (target[i].type !== "submit") {
            let key = target[i].name;
            let value = target[i].value;
            formBody[key] = value;
         }
      }
      const response = await changeStatus(formBody); // api call for changing status of student
      
      if (response.success) {
         // changing interview-status in list of students
         let updatedCandidates = candidates.map((student) => {
            if (student.candidate._id === response.studentId) {
               student.interviewStatus = response.newStatus;
            }
            return student;
         });
         setCandidates(updatedCandidates);
         toast.success("Interview status changed");
      } else {
         toast.error("Error in changing interview status");
      }
   };

   
   return (
      <div className={styles.eachInterview}>
         {confirmDelete ? (
            <div className={styles.confirmDelete}>
               <div
                  onClick={() =>
                     handleDeleteInterview(interview._id)
                  }
               >
                  Delete
               </div>
               <div onClick={() => handleDeleteClick(false)}>Cancel</div>
            </div>
         ) : (
            <FaRegTimesCircle
               onClick={() => handleDeleteClick(true)}
               className={styles.deleteIcon}
            />
         )}

         <p className={styles.companyName}>
            Company Name: {interview.companyName}
         </p>
         <p className={styles.interviewDate}>
            Interview Date: {interview.interviewDate}
         </p>

         <form onSubmit={handleAddStudent}>
            <select name="studentId">
               <option>--Add a student--</option>
               {availableStudents.map((student, i) => {
                  return (
                     <option value={student._id} key={i}>
                        {student.name}
                     </option>
                  );
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
            (candidates < 1 ? (
               <div className={styles.noStudents}>No students added...</div>
            ) : (
               <ul className={styles.listOfStudents}>
                  {candidates.map((student, index) => {
                     return (
                        <li key={index}>
                           <p>
                              {student.candidate.name}
                              <small
                                 style={statusColor(student.interviewStatus)}
                                 className={styles.intStatus}
                              >
                                 {student.interviewStatus}
                              </small>
                           </p>
                           <small className={styles.college}>
                              {student.candidate.college}
                           </small>

                           <form onSubmit={handleChangeStatus}>
                              <input
                                 type="hidden"
                                 name="interviewId"
                                 value={interview._id}
                              />
                              <input
                                 type="hidden"
                                 name="studentId"
                                 value={student.candidate._id}
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
                                 className={styles.submitBtn}
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