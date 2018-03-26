import { delay } from 'redux-saga';
import { call, put, takeEvery, race, take, } from 'redux-saga/effects';

export function* dismissToastr(action) {
    try {
        const { hide, interrupted } = yield race({
            hide: call(delay, 3000),
            interrupted: take(ac =>
                String(ac.type) === String('INTERRUPT_TOASTR_SUCCESS') &&
                ac.toastrId === action.toastrId
            )
        });

        if (hide) {
            yield put({ type: 'REMOVE_TOASTR_SUCCESS', toastrId: action.toastrId })
            return
        }

        const { dismissed } = yield race({
            dismissed: take(ac =>
                String(ac.type) === String('DISMISS_TOASTR_SUCCESS') &&
                ac.toastrId === action.toastrId
            )
        });

        if (dismissed) {
            yield put({ type: 'REMOVE_TOASTR_SUCCESS', toastrId: action.toastrId })
            return
        }
    } catch (e) {

    }
}

// here we can pass an array of sagas to export to the rootSagas
export const toastrSagas = [
    takeEvery("DISMISS_TOASTR_REQUEST", dismissToastr),
];