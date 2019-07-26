import axios from 'axios';

export default function() {
    const instance = axios.create({
        headers: {
            Authorization: localStorage.getItem('token') ? localStorage.getItem('token') : '',
        }
    })
    return instance;
}