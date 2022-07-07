import axios from 'axios'

export default axios.create({
    //baseURL:'https://localhost:44307/api',
    baseURL: 'https://vzmfapi.azurewebsites.net/api'
});

export const axiosPrivate = axios.create({
    baseURL: 'https://vzmfapi.azurewebsites.net/api',
    //baseURL:'https://localhost:44307/api',
    headers: { ContentType: 'application/json' },
    withCredentials: true
});
