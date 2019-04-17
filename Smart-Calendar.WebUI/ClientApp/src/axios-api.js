import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://ec2-13-238-195-236.ap-southeast-2.compute.amazonaws.com/api'
});

export default instance;