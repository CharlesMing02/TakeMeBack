import { AUTH, UPDATE_USER, GET_GUESS_ENTRY, FETCH_USERS } from '../constants/actionTypes';
import * as api from '../api';

export const signin = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);

        dispatch({ type: AUTH, data });

        history.push('/')
    } catch (error) {
        console.log(error);
    }
}

export const signup = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);

        dispatch({ type: AUTH, data });
        //dispatch createEntry action with a few starter entries?

        history.push('/')
    } catch (error) {
        console.log(error);
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