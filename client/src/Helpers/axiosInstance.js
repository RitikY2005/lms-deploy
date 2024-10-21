import axios from 'axios';


const BASE_URL="http://localhost:5000/api/v1";


const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true // This allows cookies to be sent
});


export default axiosInstance;