/**
 * >> GOOD WAY TO NAME THE ACTION TYPES <<
 * NAME_REQUEST
 * NAME_SUCCESS
 * NAME_FAILURE
 * NAME_CANCEL
 * NAME_RESET
 */

const INITIAL_STATE = {
    login: {
        isLoading: false,
        isLoggedIn: false,
    },
    loggedUser: {
        data: {}
    }
};

const reducers = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'LOGIN_REQUEST':
            return {
                ...state,
                login: {
                    ...state.login,
                    isLoading: true
                }
            }

        case 'LOGIN_SUCCESS':
            return {
                ...state,
                login: {
                    ...state.login,
                    isLoading: false,
                    isLoggedIn: true,
                },
                loggedUser: {
                    data: action.userData
                }
            }

        case 'LOGIN_FAILURE':
            return {
                ...state,
                login: {
                    ...state.login,
                    isLoading: false
                }
            }

        default:
            return state;
    }
}

export default reducers;