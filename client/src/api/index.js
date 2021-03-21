import axios from 'axios';

const url = 'http://localhost:5000/entries';

export const fetchEntries = () => axios.get(url);
export const createEntry = (newEntry) => axios.post(url, newEntry);
export const updateEntry = (id, updatedEntry) => axios.patch(`${url}/${id}`, updatedEntry);
export const updateAskedCount = (id) => axios.patch(`${url}/${id}/updateAskedCount`);
