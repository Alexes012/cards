import axios, {AxiosInstance} from 'axios';


export const baseURL = 'http://localhost:7542/1.0/'

export let instance: AxiosInstance;
instance = axios.create({
    baseURL
});