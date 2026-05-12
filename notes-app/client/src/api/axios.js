// import axios from "axios";

// const API = axios.create({
//   baseURL: "https://final-project-3-qemw.onrender.com/api",
// });

// API.interceptors.request.use((req) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     req.headers.Authorization = `Bearer ${token}`;
//   }
//   return req;
// });

// export default API;

// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5000/api",
// });

// export default API;
import axios from "axios";

const API = axios.create({
  baseURL: "https://final-project-3-qemw.onrender.com/api",
});

export default API;