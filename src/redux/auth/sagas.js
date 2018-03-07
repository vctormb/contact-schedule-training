import { call, put, takeEvery } from 'redux-saga/effects';
import AuthService from '../../services/auth';

export function* login(action) {
    try {
        const userData = yield call(AuthService.login);

        yield put({ type: "LOGIN_SUCCESS", userData });
        
        action.push(action.from.pathname);
    } catch (e) {
        yield put({ type: "LOGIN_FAILURE", message: e.message });
    }
}

// here we can pass an array of sagas to export to the rootSagas
export const authSagas = [
    takeEvery("LOGIN_REQUEST", login),
];