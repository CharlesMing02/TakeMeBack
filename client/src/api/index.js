import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' })

export const fetchEntries = () => API.get('/entries');
export const createEntry = (newEntry) => API.post('/entries', newEntry);
export const updateEntry = (id, updatedEntry) => API.patch(`/entries/${id}`, updatedEntry);
export const updateAskedCount = (id) => API.patch(`/entries/${id}/updateAskedCount`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
