import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

axios.interceptors.response.use(undefined, async error => {
  if (error.response?.status === 419) {
    await axios.get('sanctum/csrf-cookie');
    return axios.request(error.config)
  }

  throw error;
})


export default axios;