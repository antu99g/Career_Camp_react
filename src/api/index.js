const prefix = "https://localhost:8000";


// Function to call fetch-api for different url (with authentication token)

const customFetch = async (url, config) => {
   // Fetching authentication token from local storage
	const token = window.localStorage.getItem('TOKEN_KEY');
   
   // Stringify form body (if present)
   if(config.body){
      config.body = JSON.stringify(config.body);      
   }
   
   // Request headers
	const headers = {
      "Content-Type": "application/json"
   };

   // If token present add it to headers
	if (token) {
      headers.Authorization = `Bearer ${token}`;
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
export const login = async (email, password) => {
	const response = await customFetch("/user/login", {
      method: "POST",
      body: { email, password },
   });
   return response;
}


// Api call for log-in a user
export const signup = async (formBody) => {
	const response = await customFetch("/user/signup", {
      method: "POST",
      body: formBody,
   });
   return response;
}


// Api call for fetching all students
export const fetchAllStudents = async () => {
   const response = await customFetch("/students/data", {
      method: "GET"
   });
   return response;
};


// Api call for fetching all students
export const addNewStudent = async () => {
   const response = await customFetch("/student/add", {
      method: "POST",
      body: {}
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