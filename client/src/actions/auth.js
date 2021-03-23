import { AUTH, UPDATE_USER, GET_GUESS_ENTRY, UPDATE_ASKED_COUNT } from '../constants/actionTypes';
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
        //dispatch({ type: UPDATE_ASKED_COUNT, payload: data2 });
    } catch (error) {
        console.log(error);
    }
}