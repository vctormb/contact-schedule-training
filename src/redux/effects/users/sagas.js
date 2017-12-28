import { call, put, takeEvery } from 'redux-saga/effects';
import UsersService from '../../../services/users';

function* fetchUsers(action) {
    try {
        const users = yield call(UsersService.getUsers);
        
        yield put({ type: "FETCH_USERS_SUCCESS", users: users.data });
    } catch (e) {
        yield put({ type: "FETCH_USERS_FAILURE", message: e.message });
    }
}

// here we can pass an array of sagas to export to the rootSagas
export const userSagas = [
    takeEvery("FETCH_USERS_REQUEST", fetchUsers)
];