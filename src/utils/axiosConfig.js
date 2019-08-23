import axios from 'axios';
import history from './history';
import { LOGOUT } from '../store/reducers/auth';

export const axiosClientMySql = axios.create({
    baseURL: process.env.REACT_APP_API_URL_MYSQL,
    timeout: 10000,
});

export const axiosClientMongoDb = axios.create({
    baseURL: process.env.REACT_APP_API_URL_MONGODB,
    timeout: 10000,
});

export const setupAxiosInterceptors = (dispatch) => {
    axiosClientMySql.interceptors.request.use(config => {
        const tokenMySql = localStorage.getItem('authTokenMySql');

        if (tokenMySql !== null) {
            config.headers.Authorization = `Bearer ${tokenMySql}`;
        }

        return config;
    }, (err) => {
        return Promise.reject(err);
    });

    axiosClientMySql.interceptors.response.use(response => response, err => {
        if (err.response.status === 401) {
            dispatch({ type: LOGOUT });
            localStorage.removeItem('authTokenMySql');
            history.push('/');
        }

        return Promise.reject(err);
    });

    axiosClientMongoDb.interceptors.request.use(config => {
        const tokenMongoDb = localStorage.getItem('authTokenMongoDb');

        if (tokenMongoDb !== null) {
            config.headers.Authorization = `Bearer ${tokenMongoDb}`;
        }

        return config;
    }, (err) => {
        return Promise.reject(err);
    });

    axiosClientMongoDb.interceptors.response.use(response => response, err => {
        if (err.response.status === 401) {
            dispatch({ type: LOGOUT });
            localStorage.removeItem('authTokenMongoDb');
            history.push('/');
        }

        return Promise.reject(err);
    });
};