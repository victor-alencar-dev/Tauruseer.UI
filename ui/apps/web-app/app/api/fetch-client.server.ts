import axios from 'axios';
import https from 'https';
// this is the default value and should be always true, this is just for testing purposes
const rejectUnauthorized = 'true';

const agent = new https.Agent({
  rejectUnauthorized: rejectUnauthorized === process.env['REJECTUNAUTHORIZED'],
});

export const http = axios.create({
  baseURL: process.env['API_URL'],
  httpsAgent: agent,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const tokenInterceptor = (token: string) => {
  http.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};
