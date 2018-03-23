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
    },
    checkUserLoggedIn: {
        isLoading: true
    }
};

const reducers = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        // LOGIN
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
                    ...state.loggedUser,
                    data: action.userData
                },
                checkUserLoggedIn: {
                    ...state.checkUserLoggedIn,
                    isLoading: false
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

        // CHECK USER LOGGED IN
        case 'CHECK_USER_LOGGED_IN_REQUEST':
            return {
                ...state,
                checkUserLoggedIn: {
                    ...state.checkUserLoggedIn,
                    isLoading: true,
                }
            }
        
        // LOGOUT
        case 'LOGOUT_SUCCESS':
            return {
                ...INITIAL_STATE,
                checkUserLoggedIn: {
                    ...INITIAL_STATE.checkUserLoggedIn,
                    isLoading: false,
                }
            };


        default:
            return state;
    }
}

export default reducers;