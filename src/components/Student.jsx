import { useDelete } from "../hooks";
import styles from "../styles/home.module.css";
import { FaTimesCircle } from "react-icons/fa";

function Student({ student, handleDeleteStudent }) {
   // Custom hook to confirm deleting a student
   const [confirmDelete, handleDeleteClick] = useDelete();

   return (
      <div className={styles.eachStudent}>
         {confirmDelete ? (
            <div className={styles.confirmDelete}>
               <div>
                  <p>Data of this student will be deleted from all interviews !</p>
                  <div>
                     <span onClick={() => handleDeleteClick(false)}>Cancel</span>
                     <span onClick={() => handleDeleteStudent(student._id)}>Continue</span>
                  </div>
               </div>
            </div>
         ) : (
            <FaTimesCircle onClick={() => handleDeleteClick(true)} />
         )}

         <span>
            <p className={styles.name}>{student.name}</p>
            <p className={styles.college}>{student.college}</p>
         </span>
         <span>
            <p className={styles.batch}>Batch: {student.batch}</p>
            <small
               className={
                  student.placementStatus === "Placed"
                     ? styles.placed
                     : styles.notPlaced
               }
            >
               {student.placementStatus}
            </small>
         </span>
      </div>
   );
}

export default Student;