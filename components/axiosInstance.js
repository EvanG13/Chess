import axios from 'axios';
import { BACKEND_BASE_URL } from '@env'; // Assuming you're using react-native-dotenv for env variables
const url = BACKEND_BASE_URL;
// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: url, // Your base URL, typically from an env variable
});

export default axiosInstance;