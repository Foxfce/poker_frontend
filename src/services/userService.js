import { userApi } from '../api/axiosApi';

const addToken = (token) =>({
    headers : { Authorization: `Bearer ${token}` }
})

export const getMyProfile = async (token) => userApi.post('/me',addToken(token))