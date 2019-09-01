import { axiosClientMySql, axiosClientMongoDb } from './axiosConfig';

export default (db) => {
    return db === 'mysql' ? axiosClientMySql : axiosClientMongoDb;
}