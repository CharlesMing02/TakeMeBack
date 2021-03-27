import { AUTH, UPDATE_USER, GET_GUESS_ENTRY, FETCH_USERS } from '../constants/actionTypes';
import * as api from '../api';

export const signin = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);

        dispatch({ type: AUTH, data });

        history.push('/')
    } catch (error) {
        alert(error.response.data.message);
    }
}

export const signup = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);

        dispatch({ type: AUTH, data });
        //if data.name === 'Demo Account', call api.createEntry({entryinfo}) with a few starter entries?
        //should be doable, make sure to pass in Date() object with custom params
        //demo entries should have one universal highlight for guessing, highlight all features (media, etc.)
        //ideas: start of pandemic w/ death bed song, 
        history.push('/')
    } catch (error) {
        alert(error.response.data.message);
    }
}

export const updateUser = (id, user) => async (dispatch) => {
    try {
        const { data } = await api.updateUser(id, user);
        dispatch({ type: UPDATE_USER, payload: data});
    } catch (error) {
        console.log(error);
    }
}

export const getGuessEntry = (id) => async (dispatch) => {
    try {
        const { data } = await api.getGuessEntry(id);
        dispatch({ type: GET_GUESS_ENTRY, payload: data });

        await api.updateAskedCount(data._id);
    } catch (error) {
        console.log(error);
    }
}

export const refreshUser = (formData) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);

        dispatch({ type: AUTH, data });
    } catch (error) {
        console.log(error);
    }
}

export const getUsers = () => async (dispatch) => { 
    try {
        const { data } = await api.fetchUsers();
        dispatch({ type: FETCH_USERS, payload: data });
    } catch (error) {
        console.log(error);
    }
};