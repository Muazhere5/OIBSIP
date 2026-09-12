import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

api.interceptors.request.use((config) => {
    let token = localStorage.getItem('adminToken');
    if (!token) {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            try {
                const user = JSON.parse(userStr);
                token = user.token;
            } catch (e) {
            }
        }
    }
    if (token) {
        config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
}, (error) => Promise.reject(error));

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('user');
            localStorage.removeItem('adminToken');
            if (window.location.pathname !== '/login' && window.location.pathname !== '/admin') {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default api;
