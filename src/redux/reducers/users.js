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
  },
  deleteUser: {
    isLoading: false
  }
};

const users = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // FETCH USERS

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

    //  FETCH SINGLE USER

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

    //

    case 'REGISTER_USER_RESET':
      return {
        ...state,
        user: {
          ...state.user,
          data: {}
        }
      }

    // DELETE USER

    case 'DELETE_USER_REQUEST':
      return {
        ...state,
        deleteUser: {
          ...state.deleteUser,
          isLoading: true
        }
      }

    case 'DELETE_USER_SUCCESS':
      return {
        ...state,
        users: {
          ...state.users,
          items: state.users.items.filter(x => +x.id !== action.userId),
          isLoading: false
        },
        deleteUser: {
          ...state.deleteUser,
          isLoading: false
        }
      }

    case 'DELETE_USER_FAILURE':
      return {
        ...state,
        deleteUser: {
          ...state.deleteUser,
          isLoading: false
        }
      }

    default:
      return state;
  }
}

export default users;