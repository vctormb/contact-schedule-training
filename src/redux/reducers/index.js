import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import usersReducer from './users';

// all the reducers in one place
const rootReducers = combineReducers({
    users: usersReducer,
    form: formReducer
});

export default rootReducers;