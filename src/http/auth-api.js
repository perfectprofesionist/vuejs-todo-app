import api from './api';
export const csrfCookie = () => api.get('/sanctum/csrf-cookie');
export const login = (credentials, headers) => api.post('/auth/login', credentials, { headers });
export const register = (user, headers) => api.post('/auth/register', user, { headers });
export const logout = (headers) => api.post('/auth/logout',{},{headers});
export const getUser = () => api.get('/api/user');




