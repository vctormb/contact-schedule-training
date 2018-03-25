import { call, put, takeEvery } from 'redux-saga/effects';
import jwtDecode from 'jwt-decode';
import AuthService from '../../services/auth';

export function* login(action) {
    try {
        const { token } = yield call(AuthService.login);

        yield call(AuthService.setToken, token);

        const tokenDecoded = yield call(AuthService.getDecodedToken);

        yield put({ type: "LOGIN_SUCCESS", userData: tokenDecoded });

        action.push(action.from.pathname);
    } catch (e) {
        yield put({ type: "LOGIN_FAILURE", message: e.message });
    }
}

export function* checkUserLoggedIn(action) {
    try {
        const isLogged = yield call(AuthService.checkIsLoggedIn);

        if (isLogged) {
            const tokenDecoded = yield call(AuthService.getDecodedToken);
            
            yield put({ type: "LOGIN_SUCCESS", userData: tokenDecoded });
        } else {
            yield call(AuthService.logout);
            yield put({ type: "LOGOUT_SUCCESS" });
        }
    } catch (e) {
        yield put({ type: "LOGOUT_SUCCESS" });
    }
}

export function* logout(action) {
    try {
        yield call(AuthService.logout);

        action.push('/login');
        
        yield put({ type: "LOGOUT_SUCCESS" });
    } catch (e) {
        // 
    }
}

// here we can pass an array of sagas to export to the rootSagas
export const authSagas = [
    takeEvery("LOGIN_REQUEST", login),
    takeEvery("CHECK_USER_LOGGED_IN_REQUEST", checkUserLoggedIn),
    takeEvery("LOGOUT_REQUEST", logout),
];