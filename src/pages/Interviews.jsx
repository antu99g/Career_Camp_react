import { useEffect, useLayoutEffect, useState } from 'react'; 
import { FaCalendarCheck, FaPlus, FaArrowDown } from "react-icons/fa";
import { FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { addNewInterview, fetchAllInterviews, downloadInterviewLog, deleteInterview } from '../api';
import {Interview} from '../components';
import styles from '../styles/interviews.module.css';

function Interviews () {
   // List of all interviews
   const [interviews, setInterviews] = useState([]);

   // List of all students
   const [students, setStudents] = useState([]);
   
   // States used for adding students in interview-form
   const [showStudents, setShowStudents] = useState(false); // showing list of students to add

   const [list, setList] = useState([]); // list of all students (to select from)

   const [selected, setSelected] = useState([]); // list of selected students


   useLayoutEffect(() => {
      (async () => {
         // API call for fetching list of all interviews
         const response = await fetchAllInterviews();
         setInterviews(response.interviews);
         setStudents(response.students);
      })();
   }, []);
   

   useEffect(() => {
      // filling the list of all students again after submitting form
      if(selected.length < 1){
         setList(students);
      }
   }, [showStudents, selected]);


   // Function to shedule an interview
   const handleAddInterview = async (e) => {
      e.preventDefault();
      const { target } = e;

      let formBody = {}; // storing all form data in an object
      for (let i = 0; i < target.length; i++) {
         if (target[i].type !== "submit") {
            let key = target[i].name;
            let value = target[i].value.split("-").reverse().join("-"); //reversing date to dd-mm-yy
            formBody[key] = value;
         }
      }
      // sending array of student ids to api
      formBody.students = selected.map((student) => {
         return student._id;
      });
      const response = await addNewInterview(formBody); // api call for adding new interview
      if (response.success) {
         setInterviews((interviewList) => [
            ...interviewList,
            response.newInterview,
         ]);
         e.target.reset();
         setSelected([]);
         toast.success("Interview scheduled successfully");
      } else {
         toast.error("Error in adding new interview");
      }
   }

   
   const handleDeleteInterview = async (id) => {
      const response = await deleteInterview(id);
      if (response.success) {
         // removing deleted interview from interviews-list
         setInterviews((interviews) =>
            interviews.filter((interviews) => interviews._id !== id)
         );
         toast.warn("Interview deleted", { icon: false });
      } else {
         toast.error("Error in deleting interview");
      }
   };

   
   return (
      <div>
         <form
            onSubmit={handleAddInterview}
            className={styles.interviewForm}
         >
            <span className={styles.downloadBtn} onClick={() => downloadInterviewLog()}>
               <FaArrowDown style={{ marginRight: 5 }} />
               Download Interview Log
            </span>

            <div className={styles.interviewField}>
               <h4>Interview Details</h4>
               <p>
                  Company Name <input type="text" name="companyName" required />
               </p>
               <p>
                  Interview Date
                  <input type="date" name="interviewDate" required />
               </p>
            </div>

            <div className={styles.addStudentSection}>
               <span
                  className={styles.addStudentBtn}
                  onClick={() => setShowStudents(!showStudents)}
               >
                  Add Student
                  <FaPlus />
               </span>

               {showStudents && (
                  <div className={styles.studentList}>
                     {list.map((student, i) => {
                        return (
                           <div
                              className={styles.addStudent}
                              onClick={() => {
                                 setSelected([...selected, student]);
                                 setList((list) =>
                                    list.filter(
                                       (listStudent) =>
                                          listStudent._id !== student._id
                                    )
                                 );
                                 setShowStudents(false);
                              }}
                              key={i}
                           >
                              {student.name}
                           </div>
                        );
                     })}
                  </div>
               )}

               <span className={styles.addedStudents}>
                  {selected.map((student, i) => {
                     return (
                        <span key={i}>
                           {student.name}
                           <FiX
                              onClick={() => {
                                 setList([...list, student]);
                                 setSelected((list) =>
                                    list.filter((listStudent) => listStudent._id !== student._id)
                                 );
                              }}
                           />
                        </span>
                     );
                  })}
               </span>
            </div>

            <button type="submit" className={styles.submitBtn}>
               <FaCalendarCheck style={{ marginTop: -4 }} />
               Create Interview
            </button>
         </form>

         <div className={styles.allInterviewList}>
            <h2>Interviews</h2>

            {interviews && interviews.length > 0 ? (
               interviews.map((interview, index) => {
                  return <Interview interview={interview} handleDeleteInterview={handleDeleteInterview} key={index} />;
               })
            ) : (
               <p className={styles.noInterview}>No interviews added...</p>
            )}
         </div>
      </div>
   );
}

export default Interviews;