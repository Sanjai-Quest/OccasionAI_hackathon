import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';

const api = axios.create({
    baseURL: API_BASE_URL,
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => response.data,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Authentication services
export const authService = {
    login: (username, password) =>
        api.post('/auth/login', { username, password }),

    register: (username, password, email, craftType) =>
        api.post('/auth/register', { username, password, email, craftType }),
};

// Media upload service
export const mediaService = {
    uploadFiles: (files) => {
        const formData = new FormData();
        files.forEach(file => {
            formData.append('files', file);
        });

        return api.post('/media/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },
};

// AI services
export const aiService = {
    generateStory: (artisanName, craftType) =>
        api.post('/ai/story', { artisanName, craftType }),

    generateSocialPosts: (craftType, tone = 'friendly') =>
        api.post('/ai/social', { craftType, tone }),
};

export default api;