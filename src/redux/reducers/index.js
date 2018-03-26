import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import usersReducer from '../users/reducers';
import authReducer from '../auth/reducers';
import toastrReducer from '../toastr/reducers';

// all the reducers in one place
const rootReducers = combineReducers({
    form: formReducer,
    toastr: toastrReducer,
    users: usersReducer,
    auth: authReducer,
});

export default rootReducers;