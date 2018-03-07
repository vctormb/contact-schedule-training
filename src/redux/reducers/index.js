import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import usersReducer from '../users/reducers';
import authReducer from '../auth/reducers';

// all the reducers in one place
const rootReducers = combineReducers({
    users: usersReducer,
    auth: authReducer,
    form: formReducer,
});

export default rootReducers;