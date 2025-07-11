import { authApi } from '../api/axiosApi';

export const login = async (username, password) => {
    const response = await authApi.post('/login', { username, password });
    return response.data.accessToken;
}

export const register = async (username, password, confirmPassword) => {
    const response = await authApi.post('/register', { username, password })
    return response;
}

export const forgotPassword = async (username) => {
    const response = await authApi.post('/forgot-password', { username });
    return response;
}

export const resetPassword = async (token, newPassword) => {
    const response = await authApi.post(`/reset-password/${token}`, { password: newPassword });
    return response;
}