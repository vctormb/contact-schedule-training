import { all } from 'redux-saga/effects';
import { userSagas } from '../users/sagas';
import { authSagas } from '../auth/sagas';

export default function* rootSagas() {

    // here we initialize all the sagas from different files
    yield all([
        ...userSagas,
        ...authSagas,
    ]);
}