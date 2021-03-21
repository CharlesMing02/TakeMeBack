import { FETCH_ALL, CREATE, UPDATE, UPDATE_ASKED_COUNT } from '../constants/actionTypes';
/* eslint-disable import/no-anonymous-default-export */
export default (state = [], action) => {
    switch (action.type) {
        case UPDATE:
        case UPDATE_ASKED_COUNT:
            return state.map((entry) => entry._id === action.payload._id ? action.payload : entry);
        case FETCH_ALL:
            return action.payload;
        case CREATE:
            return [...state, action.payload];
        default:
            return state;
    }
}