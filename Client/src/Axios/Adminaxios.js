import axios from 'axios';
import { useSelector } from 'react-redux';
const adminAPI = import.meta.env.VITE_ADMIN_API


const adminAxios = () => {
  const token = useSelector((store) => store.Admin.token);

  const adminAxiosInstance = axios.create({
    baseURL: adminAPI,
    withCredentials: true,
  });

  adminAxiosInstance.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return adminAxiosInstance;
};

export default adminAxios;
