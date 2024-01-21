import axios from 'axios';
import { useSelector } from 'react-redux';

const userAxios = () => {
  const token = useSelector((store) => store.Client.token);

  const userAxiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api/',
    withCredentials: true,
  });

  userAxiosInstance.interceptors.request.use(
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

  return userAxiosInstance;
};

export default userAxios;