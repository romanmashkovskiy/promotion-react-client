import axios from 'axios';
import history from './history';

const axiosClientMySql = axios.create({
    baseURL: process.env.REACT_APP_API_URL_MYSQL,
    timeout: 10000,
});

export default axiosClientMySql;

export const setupAxiosInterceptors = () => {
    axiosClientMySql.interceptors.request.use(config => {
        const tokenMySql = localStorage.getItem('authTokenMySql');
        const tokenMongoDb = localStorage.getItem('authTokenMongoDb');

        if (tokenMySql !== null) {
            config.headers.Authorization = `Bearer ${tokenMySql}`;
        }

        if (tokenMongoDb !== null) {
            config.headers.Authorization = `Bearer ${tokenMongoDb}`;
        }

        return config;
    }, (err) => {
        return Promise.reject(err);
    });

    axiosClientMySql.interceptors.response.use(response => response, err => {
        if (err.response.status === 401) {
            // todo: need to dispatch logout action here

            localStorage.removeItem('authTokenMySql');
            localStorage.removeItem('authTokenMongoDb');
            history.push('/');
        }

        return Promise.reject(err);
    });
};