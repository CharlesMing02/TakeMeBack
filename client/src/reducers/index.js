import { combineReducers } from 'redux';

import entries from './entries';
import auth from './auth';
import tutorial from './tutorial';

export default combineReducers({
    entries,
    auth,
    tutorial
});