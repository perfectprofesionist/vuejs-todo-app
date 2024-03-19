import api from './api';
export const csrfCookie = () => api.get('/sanctum/csrf-cookie');
export const login = (credentials, headers) => api.post('/auth/login', credentials, { headers });
export const register = (user) => api.post('/auth/register', user);
export const logout = (headers) => api.post('/auth/logout',{},{headers});
export const getUser = () => api.get('/api/user');




