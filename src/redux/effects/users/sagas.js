import { call, put, takeEvery } from 'redux-saga/effects';
import UsersService from '../../../services/users';

export function* fetchUsers(action) {
    try {
        const users = yield call(UsersService.getUsers);

        yield put({ type: "FETCH_USERS_SUCCESS", users: users.data });
    } catch (e) {
        yield put({ type: "FETCH_USERS_FAILURE", message: e.message });
    }
}

function* fetchUser(action) {
    const { userId } = action.payload;

    try {
        const user = yield call(UsersService.getUser, userId);

        yield put({ type: "FETCH_USER_SUCCESS", user: user.data });
    } catch (e) {
        yield put({ type: "FETCH_USER_FAILURE", message: e.message });
    }
}

function* addUser(action) {
    try {
        // testing redirecting page with react router inside redux-saga
        action.push('/users');
    } catch (e) {
        yield put({ type: "ADD_USER_FAILURE", message: e.message });
    }
}

export function* deleteUser(action) {
    const { userId } = action.payload;

    try {
        const deletedUser = yield call(UsersService.deleteUser, userId);

        yield put({ type: "DELETE_USER_SUCCESS", userId });
    } catch (e) {
        yield put({ type: "DELETE_USER_FAILURE", message: e.message });
    }
}

// here we can pass an array of sagas to export to the rootSagas
export const userSagas = [
    takeEvery("FETCH_USERS_REQUEST", fetchUsers),
    takeEvery("FETCH_USER_REQUEST", fetchUser),
    takeEvery("ADD_USER_REQUEST", addUser),
    takeEvery("DELETE_USER_REQUEST", deleteUser),
];