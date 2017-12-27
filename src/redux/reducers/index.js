import { combineReducers } from 'redux';
import users from './users';

// all the reducers in one place
const rootReducers = combineReducers({
    users: users,
});

export default rootReducers;