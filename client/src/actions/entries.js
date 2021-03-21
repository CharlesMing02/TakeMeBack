import * as api from '../api';

// Action Creator Functions that return functions. Weird async syntax is from redux thunk
export const getEntries = () => async (dispatch) => { 
    try {
        const { data } = await api.fetchEntries();
        dispatch({ type: 'FETCH_ALL', payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const createEntry = (newEntry) => async (dispatch) => {
    try {
        const { data } = await api.createEntry(newEntry);
        dispatch({ type: 'CREATE', payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const updateEntry = (id, entry) => async (dispatch) => {
    try {
        const { data } = await api.updateEntry(id, entry);
        dispatch({ type: 'UPDATE', payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const updateAskedCount = (id) => async (dispatch) => {
    try {
        const { data } = await api.updateAskedCount(id);
        dispatch({ type: 'UPDATE_ASKED_COUNT', payload: data });
    } catch (error) {
        console.log(error)
    }
}