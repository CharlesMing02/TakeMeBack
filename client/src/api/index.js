import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`; //send token for auth middleware
    }

    return req;
})

export const fetchEntries = () => API.get('/entries');
export const createEntry = (newEntry) => API.post('/entries', newEntry);
export const updateEntry = (id, updatedEntry) => API.patch(`/entries/${id}`, updatedEntry);
export const updateAskedCount = (id) => API.patch(`/entries/${id}/updateAskedCount`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
export const updateUser = (id, updatedUser) => API.patch(`/user/${id}`, updatedUser);
