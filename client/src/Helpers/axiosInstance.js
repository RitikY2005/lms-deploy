import axios from 'axios';


const BASE_URL="https://lms-deploy-backend.onrender.com/api/v1";


const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true // This allows cookies to be sent
});


export default axiosInstance;
