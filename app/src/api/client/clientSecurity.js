import axios from 'axios';

const clientSecurity = axios.create({
  baseURL: 'http://172.16.18.11:3020/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin' : '*',
  },
});

export default clientSecurity
