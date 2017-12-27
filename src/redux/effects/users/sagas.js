import { call, put, takeEvery } from 'redux-saga/effects';

function* fetchUsers(action) {
    try {
        console.log('SAGA: FETCH USERS WORKED!')
        // const users = yield call(Api.fetchUser, action.payload.userId);
        // yield put({ type: "FETCH_USERS_SUCCESS", users: users });
    } catch (e) {
        yield put({ type: "FETCH_USERS_FAILURE", message: e.message });
    }
}

// here we can pass an array of sagas to export to the rootSagas
export const userSagas = [
    takeEvery("FETCH_USERS_REQUEST", fetchUsers)
];