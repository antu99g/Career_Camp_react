import { useLayoutEffect, useState } from "react";
import { fetchAllStudents, addNewStudent, deleteStudent, downloadStudentsLog } from "../api";
import styles from '../styles/home.module.css';
import { FaArrowDown, FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import Student from "../components/Student";

function Home () {
   // List of all students
   const [students, setStudents] = useState([]);


   useLayoutEffect(() => {
      (async () => {
         const response = await fetchAllStudents(); // api call for fetching all students
         setStudents(response.students);
      })();
   }, []);


   // Function for adding new student
   const handleAddNewStudent = async (e) => {
      e.preventDefault();
      const { target } = e;

      let formBody = {}; // storing all form data in an object
      for (let i = 0; i < target.length; i++) {
         if (target[i].type !== "submit") {
            let key = target[i].name;
            let value = target[i].value;
            formBody[key] = value;
         }
      }
      const response = await addNewStudent(formBody); // api call for adding new student
      if(response.success){
         setStudents((studentList) => [...studentList, response.student]); // adding new student to students list
         toast.success('New student registered!!');
      } else {
         toast.error("Error in registering student");
      }
      e.target.reset(); // clearing form after submitting
   }


   // Function for deleting a student
   const handleDeleteStudent = async (id) => {
      const response = await deleteStudent(id); // api call for deleting a student
      if (response.success) {
         // removing deleted student from students-list
         setStudents((students) =>
            students.filter((students) => students._id !== id)
         );
         toast.warn("Student Deleted", { icon: false });
      } else {
         toast.error("Error in deleting student");
      }
   };


   return (
      <div>
         <button className={styles.downloadBtn} onClick={() => downloadStudentsLog()}><FaArrowDown/>Download Students Log</button>

         <form onSubmit={handleAddNewStudent} className={styles.studentAddForm} >
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
                        <label>Placed</label>
                     </div>
                     <input type="radio" name="placementStatus" value="Not placed" id="notPlaced" />
                     <label>Not Placed</label>
               </div>
            </div>

            <button type="submit" className={styles.submitBtn}><FaPlus/>Add Student</button>
         </form>


         <h2 className={styles.studentHeader}>Students</h2>

         {students && students.length > 0 ? (
            <div className={styles.allStudentList}>
               {students.map((student, i) => <Student student={student} handleDeleteStudent={handleDeleteStudent} key={i} />)}            
            </div>
         ) : (
            <p className={styles.noStudent}>No students added...</p>
         )}
      </div>
   );
}

export default Home;