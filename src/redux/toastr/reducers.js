import { generateGuid } from '../../utils/guid'

/**
 * >> GOOD WAY TO NAME THE ACTION TYPES <<
 * NAME_REQUEST
 * NAME_SUCCESS
 * NAME_FAILURE
 * NAME_CANCEL
 * NAME_RESET
 */

const INITIAL_STATE = {
    toastrs: [
        // {
        //     message: 'toastr fixed',
        //     id: 1
        // }
    ]
};

const reducers = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        // LOGIN
        case 'ADD_TOASTR_SUCCESS':
            return {
                ...state,
                toastrs: [
                    {
                        ...action.toastr,
                        id: generateGuid(),
                        called: false
                    },
                    ...state.toastrs,
                ]
            }

        case 'REMOVE_TOASTR_SUCCESS':
            return {
                ...state,
                toastrs: state.toastrs.filter(x => x.id !== action.toastrId)
            }

        case 'CALLED_TOASTR_SUCCESS':
            return {
                ...state,
                toastrs: state.toastrs.map(val => {
                    if(val.id === action.toastrId) {
                        return {
                            ...val,
                            called: true,
                        }
                    }

                    return val
                })
            }

        default:
            return state;
    }
}

export default reducers;