import React from 'react';
import { shallow } from 'enzyme';
import { ListUsers } from '../../containers/users/ListUsers';
import reducer from '../../redux/reducers/users';

describe('<ListUsers />', () => {
    const INITIAL_STATE = {
        usersReducer: {
            users: {
                isLoading: false,
                items: []
            }
        }
    }

    describe('ListUsers reducer', () => {
        it('it should return the initial state', () => {
            expect(reducer(undefined, {})).toMatchObject(
                { users: INITIAL_STATE.usersReducer.users }
            );
        });

        it('should handle FETCH_USERS_REQUEST', () => {
            expect(
                reducer(
                    { users: INITIAL_STATE.usersReducer.users },
                    { type: 'FETCH_USERS_REQUEST' }
                )
            ).toMatchObject({ users: { ...INITIAL_STATE.usersReducer.users, isLoading: true } })
        });

        it('should handle FETCH_USERS_SUCCESS', () => {
            expect(
                reducer(
                    { users: INITIAL_STATE.usersReducer.users },
                    { type: 'FETCH_USERS_SUCCESS', users: [{ name: 'Foo User' }] }
                )
            ).toEqual({
                users: {
                    isLoading: false,
                    items: [{ name: 'Foo User' }]
                }
            });
        });

    });

});