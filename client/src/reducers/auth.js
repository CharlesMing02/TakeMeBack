import { AUTH, LOGOUT, UPDATE_USER, GET_GUESS_ENTRY, UPDATE_DAILY_ENTRY } from '../constants/actionTypes';

/* eslint-disable import/no-anonymous-default-export */
const authReducer = (state = { authData: null, dailyEntry: null, guessEntry: JSON.parse(localStorage.getItem('guessEntry')) }, action) => {
    switch (action.type) {
        case AUTH:
            const missingPoints = { ...action?.data };
            if (missingPoints.hasOwnProperty('results')) {
                if (!missingPoints.results.hasOwnProperty('streak')) { //looking back not sure why results/result
                    missingPoints.result.streak = 0;
                }
                if (!missingPoints.results.hasOwnProperty('points')) {
                    missingPoints.result.points = 0;
                }
            }
            localStorage.setItem('profile', JSON.stringify(missingPoints));
            return { ...state, authData: missingPoints };
        case LOGOUT:
            localStorage.clear();
            return { ...state, authData: null };
        case UPDATE_USER:
            const old = state.authData;
            old.result = { ...action?.payload };
            localStorage.setItem('profile', JSON.stringify(old));
            return { ...state, authData: old };
        case GET_GUESS_ENTRY:
            localStorage.setItem('guessEntry', JSON.stringify(action.payload));
            return { ...state, guessEntry: action.payload }
        case UPDATE_DAILY_ENTRY:
            localStorage.setItem('dailyEntry', JSON.stringify(action.data));
            return { ...state, dailyEntry: action?.data }
        default:
            return state;
    }
}

export default authReducer;