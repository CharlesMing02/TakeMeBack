import { AUTH, LOGOUT } from '../constants/actionTypes';

/* eslint-disable import/no-anonymous-default-export */
const authReducer = (state = { authData: null }, action) => {
    switch (action.type) {
        case AUTH:
            const missingPoints = { ...action?.data };
            if (missingPoints.hasOwnProperty('results')) {
                if (!missingPoints.results.hasOwnProperty('streak')) {
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
        default:
            return state;
    }
}

export default authReducer;