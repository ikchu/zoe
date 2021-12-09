import axios from 'axios';
import {useSelector} from 'react-redux';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
  // baseURL: 'http://192.168.1.188:8888/api/',
});

// const Interceptor = async (config) => {
//   const token = useSelector((state) => state.ar.token);
//   config.headers.common.Authorization = `Token ${token}`;
//   return config;
// };
// instance.interceptors.request.use(Interceptor);

export default instance;
