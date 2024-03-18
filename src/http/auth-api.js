import api from './api';
export const csrfCookie = () => api.get('/sanctum/csrf-cookie');
export const login = (credentials, headers) => api.post('/auth/login', credentials, { headers });
export const register = (user) => api.post('/auth/register', user);
export const logout = () => api.post('/auth/logout');
export const getUser = () => api.get('/api/user');

