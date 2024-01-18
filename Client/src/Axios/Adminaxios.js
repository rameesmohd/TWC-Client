import axios from 'axios'

const Useraxios = axios.create({
    baseURL: 'http://localhost:3000/api/admin/',
    headers: {'X-Custom-Header': 'foobar'}
  });

export default Useraxios