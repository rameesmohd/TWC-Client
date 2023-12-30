import axios from 'axios'

const Useraxios = axios.create({
    baseURL: 'https://tradewalker/api/',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
  });

export default Useraxios