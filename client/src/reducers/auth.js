import { AUTH, LOGOUT, UPDATE_USER } from '../constants/actionTypes';

/* eslint-disable import/no-anonymous-default-export */
const authReducer = (state = { authData: null, dailyEntry: { highlights: '', description: '', selectedFile: '' } }, action) => {
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
            old.result = { ...action?.payload }
            console.log({ ...state, authData: old });
            localStorage.setItem('profile', JSON.stringify(old));
            return { ...state, authData: old };
        default:
            return state;
    }
}

export default authReducer;