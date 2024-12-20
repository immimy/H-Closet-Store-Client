import axios from 'axios';

export const customFetch = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
  headers: {
    Accept: 'application/json',
  },
  // Initiate credentials mode of request
  // (cross-site Access-Control request)
  withCredentials: true,
});
