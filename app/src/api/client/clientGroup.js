import axios from 'axios';

const clientGroup = axios.create({
  baseURL: 'http://172.16.18.11:3021/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin' : '*',
  },
});

export default clientGroup
