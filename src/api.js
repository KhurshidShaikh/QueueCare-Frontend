import axios from 'axios';

const api = axios.create({
    baseURL: '/api', // Proxy in vite.config.js will handle this
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
