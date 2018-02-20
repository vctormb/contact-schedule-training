import React from 'react';
import PropTypes from 'prop-types';
import { shallow, mount } from 'enzyme';
import { ListUsers } from './ListUsers';
import reducer from '../../redux/reducers/users';

describe('<ListUsers />', () => {
    const dispatch = jest.fn();
    const push = jest.fn();

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
        ...INITIAL_STATE,
        history: { push }
    };

    let listUsers = shallow(<ListUsers {...props} />);

    it('should render properly', () => {
        expect(listUsers).toMatchSnapshot();
    });

    describe('when componentDidMount()', () => {
        beforeEach(() => {
            listUsers = mount(<ListUsers {...props} />);
        });

        it('should dispatch FETCH_USERS_REQUEST action', () => {
            expect(dispatch).toBeCalledWith({type: "FETCH_USERS_REQUEST"});
        });
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

    describe('when the list of users are not empty', () => {
        beforeEach(() => {
            INITIAL_STATE = {
                usersReducer: {
                    users: {
                        ...INITIAL_STATE.usersReducer.users,
                        items: [{ id: 1, name: 'Foo 1' }, { id: 2, name: 'Foo 2' }],
                        isLoading: false
                    }
                }
            }

            props = { ...props, ...INITIAL_STATE }

            listUsers = shallow(<ListUsers {...props} />);
        });

        it('should return the max number', () => {
            expect(listUsers.instance().props.usersReducer.users.items).toHaveLength(2);
        });

        describe('and the user wants to edit a user', () => {
            beforeEach(() => {
                push.mockClear();
            });

            it('should redirect to the edit page from user with id 1', () => {
                listUsers.find('.edit-user-0').simulate('click'); // first user
                expect(listUsers.instance().props.history.push).toHaveBeenCalledWith(`/users/${1}/edit`);
            });

            it('should redirect to the edit page from user with id 2', () => {
                listUsers.find('.edit-user-1').simulate('click'); // second user
                expect(listUsers.instance().props.history.push).toHaveBeenCalledWith(`/users/${2}/edit`);
            });
        });


    });
});