const prefix = "https://career-camp-api.onrender.com";


// Function to call fetch-api for different url (with authentication token)

const customFetch = async (url, config) => {
   // Fetching authentication token from local storage
	const token = window.localStorage.getItem('CAREER_CAMP_TOKEN_KEY');
   
   // Request headers
   const headers = {
      "Content-Type": "application/json", // default content-type
   };

   // If token present add it to headers
   if (token) {
      headers.Authorization = `Bearer ${token}`;
   }
   
   // Stringify form body (if present)
   if(config.body){
      config.body = JSON.stringify(config.body);      
   }

   try {
      // API call with all given configurations
		const response = await fetch(String(prefix + url), { headers, ...config });
      const json = await response.json();

      if (json.success) {
         return json;
      }

      throw new Error(json.message);      
   } catch (err) {
		return {
         api_call_success: false,
         flag: 'error from custom fetch',
         message: err.message || err,
      };
   }
}


// Api call for log-in a user
export const login = async (employeeId, password) => {
   const response = await customFetch("/user/login", {
      method: "POST",
      body: { employeeId, password },
   });
   return response;
};


// Api call for sign-up a user
export const signup = async (employeeId, password) => {
   const response = await customFetch("/user/signup", {
      method: "POST",
      body: { employeeId, password },
   });
   return response;
};


// Api call for fetching all students
export const fetchAllStudents = async () => {
   const response = await customFetch("/students/data", {
      method: "GET"
   });
   return response;
};


// Api call for register new student
export const addNewStudent = async (formBody) => {
   const response = await customFetch("/student/add", {
      method: "POST",
      body: formBody,
   });
   return response;
};


// Api call for deleting a student
export const deleteStudent = async (id) => {
   const response = await customFetch(`/student/${id}/delete`, {
      method: "DELETE"
   });
   return response;
};


// Api call for fetching all interviews
export const fetchAllInterviews = async () => {
   const response = await customFetch("/interview/data", {
      method: "GET",
   });
   return response;
};


// Api call to schedule an interview
export const addNewInterview = async (formBody) => {
   const response = await customFetch("/interview/create", {
      method: "POST",
      body: formBody,
   });
   return response;
};


// Api call for deleting interview
export const deleteInterview = async (id) => {
   const response = await customFetch(`/interview/${id}/delete`, {
      method: "DELETE",
   });
   return response;
};


// Api call for adding student to an interview
export const addStudentToInterview = async (formBody) => {
   const response = await customFetch("/interview/add-student", {
      method: "POST",
      body: formBody,
   });
   return response;
};


// Api call for changing status of a student in an interview
export const changeStatus = async (formBody) => {
   const response = await customFetch("/interview/status/set", {
      method: "POST",
      body: formBody,
   });
   return response;
};


// Api call for downloading all student information
export const downloadStudentsLog = async () => {
   const response = await customFetch("/students/log", {
      method: "GET"
   });   
   const blob = new Blob([response.file]);
   const url = URL.createObjectURL(blob);
   const link = document.createElement("a");
   link.href = url;
   link.download = "students_log.csv";
   link.click();
};


// Api call for downloading all interview information
export const downloadInterviewLog = async () => {
   const response = await customFetch("/interview/log", {
      method: "GET"
   });
   const blob = new Blob([response.file]);
   const url = URL.createObjectURL(blob);
   const link = document.createElement("a");
   link.href = url;
   link.download = "interview_log.csv";
   link.click();
};