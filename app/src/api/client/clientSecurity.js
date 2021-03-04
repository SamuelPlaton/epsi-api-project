import axios from 'axios';

const clientSecurity = axios.create({
  baseURL: 'http://127.0.0.1:3001/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin' : '*',
  },
});

export default clientSecurity
