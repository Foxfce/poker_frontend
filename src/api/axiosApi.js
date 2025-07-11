import axios from "axios";

export const authApi = axios.create({
    baseURL : 'http://localhost:6969/api/auth'
});

export const userApi = axios.create({
    baseURL: 'http://localhost:6969/api/user'
});

export const tableApi = axios.create({
    baseURL: 'http://localhost:6969/api/table'
});

export const lobbyApi = axios.create({
    baseURL: 'http://localhost:6969/api/table'
});

export const adminApi = axios.create({
    baseURL: 'http://localhost:6969/api/admin'
});

