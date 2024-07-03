import axios from 'axios';
export const HttpServer = axios.create({
    baseURL: 'http://localhost:5000',
});
