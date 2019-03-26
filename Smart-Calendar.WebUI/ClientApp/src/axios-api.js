import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://localhost:44314/api/'
});

export default instance;