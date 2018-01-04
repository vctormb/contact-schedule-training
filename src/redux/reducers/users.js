/**
 * >> GOOD WAY TO NAME THE ACTION TYPES <<
 * NAME_REQUEST
 * NAME_SUCCESS
 * NAME_FAILURE
 * NAME_CANCEL
 * NAME_RESET
 */

const INITIAL_STATE = {
  users: {
    isLoading: false,
    items: []
  },
  user: {
    isLoading: false,
    data: {}
  }
};

const users = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'FETCH_USERS_REQUEST':
      return {
        ...state,
        users: {
          ...state.users,
          isLoading: true
        }
      }

    case 'FETCH_USERS_SUCCESS':
      return {
        ...state,
        users: {
          ...state.users,
          isLoading: false,
          items: action.users
        }
      }

    case 'FETCH_USERS_FAILURE':
      return {
        ...state,
        users: {
          ...state.users,
          isLoading: false,
        }
      }

    // 

    case 'FETCH_USER_REQUEST':
      return {
        ...state,
        user: {
          ...state.user,
          isLoading: true
        }
      }

    case 'FETCH_USER_SUCCESS':
      return {
        ...state,
        user: {
          ...state.user,
          isLoading: false,
          data: action.user
        }
      }

    case 'REGISTER_USER_RESET':
      return {
        ...state,
        user: {
          ...state.user,
          data: {}
        }
      }

    default:
      return state;
  }
}

export default users;