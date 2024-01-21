import axios from 'axios';
import { useSelector } from 'react-redux';

const adminAxios = () => {
  const token = useSelector((store) => store.Admin.token);

  const adminAxiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api/admin/',
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
