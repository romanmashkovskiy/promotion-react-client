import axios from 'axios';
import history from './history';

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 10000,
});

export default axiosClient;

export const setupAxiosInterceptors = () => {
    axiosClient.interceptors.request.use(config => {
        const token = localStorage.getItem('authToken');

        if (token !== null) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    }, (err) => {
        return Promise.reject(err);
    });

    axiosClient.interceptors.response.use(response => response, err => {
        if (err.response.status === 401) {
            localStorage.removeItem('authToken');
            history.push('/');
        }

        return Promise.reject(err);
    });
};