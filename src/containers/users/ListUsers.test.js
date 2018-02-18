import React from 'react';
import { shallow } from 'enzyme';
import { ListUsers } from './ListUsers';
import reducer from '../../redux/reducers/users';

describe('<ListUsers />', () => {
    const dispatch = jest.fn();
    let INITIAL_STATE = {
        usersReducer: {
            users: {
                items: [],
                isLoading: false,
            }
        }
    }

    let props = {
        dispatch,
        ...INITIAL_STATE
    };

    let listUsers = shallow(<ListUsers {...props} />);

    it('should render properly', () => {
        expect(listUsers).toMatchSnapshot();
    });

    describe('when fetching users', () => {
        beforeEach(() => {
            INITIAL_STATE = {
                usersReducer: {
                    users: {
                        ...INITIAL_STATE.usersReducer.users,
                        isLoading: true
                    }
                }
            }

            props = { ...props, ...INITIAL_STATE }

            listUsers = shallow(<ListUsers {...props} />);
        });

        it('should render the loading message', () => {
            expect(listUsers.find('.fetching-users').exists()).toEqual(true);
        });
    });
});