import React from 'react';
import { shallow } from 'enzyme';
import { ListUsers } from '../../containers/users/ListUsers';
import reducer from '../../redux/reducers/users';

describe('Users reducer', () => {
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
            isLoading: false,
        }
    }

    it('it should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(
            { ...INITIAL_STATE }
        );
    });

    describe('when fetching users', () => {
        it('should handle FETCH_USERS_REQUEST', () => {
            expect(
                reducer(
                    { ...INITIAL_STATE },
                    { type: 'FETCH_USERS_REQUEST' }
                )
            ).toEqual({
                ...INITIAL_STATE,
                users: { ...INITIAL_STATE.users, isLoading: true }
            })
        });

        it('should handle FETCH_USERS_SUCCESS', () => {
            expect(
                reducer(
                    { ...INITIAL_STATE },
                    { type: 'FETCH_USERS_SUCCESS', users: [{ id: 1, name: 'Foo User' }, { id: 2, name: 'Foo User 2' }] }
                )
            ).toEqual({
                ...INITIAL_STATE,
                users: {
                    isLoading: false,
                    items: [{ id: 1, name: 'Foo User' }, { id: 2, name: 'Foo User 2' }]
                }
            });
        });

        it('should handle FETCH_USERS_FAILURE', () => {
            expect(
                reducer(
                    { ...INITIAL_STATE },
                    { type: 'FETCH_USERS_FAILURE' }
                )
            ).toEqual({
                ...INITIAL_STATE,
                users: { ...INITIAL_STATE.users, isLoading: false }
            });
        });
    });

    describe('when deleting an user', () => {
        it('should handle DELETE_USER_REQUEST', () => {
            expect(
                reducer(
                    { ...INITIAL_STATE },
                    { type: 'DELETE_USER_REQUEST' }
                )
            ).toEqual({
                ...INITIAL_STATE,
                deleteUser: { ...INITIAL_STATE.deleteUser, isLoading: true }
            });
        });

        it('should handle DELETE_USER_SUCCESS', () => {
            expect(
                reducer(
                    { ...INITIAL_STATE, users: { items: [{ id: 1 }] } },
                    { type: 'DELETE_USER_SUCCESS', userId: 1 }
                )
            ).toEqual({
                ...INITIAL_STATE,
                users: { ...INITIAL_STATE.users, items: [] },
                deleteUser: { ...INITIAL_STATE.deleteUser, isLoading: false }
            });
        });

        describe('and when there are more than one user in array', () => {
            it('should remove only the especified user', () => {
                expect(
                    reducer(
                        { ...INITIAL_STATE, users: { items: [{ id: 1 }, { id: 2 }] } },
                        { type: 'DELETE_USER_SUCCESS', userId: 2 }
                    )
                ).toEqual({
                    ...INITIAL_STATE,
                    users: { ...INITIAL_STATE.users, items: [{ id: 1 }] },
                    deleteUser: { ...INITIAL_STATE.deleteUser, isLoading: false }
                });
            });
        });

        it('should handle DELETE_USER_FAILURE', () => {
            expect(
                reducer(
                    { ...INITIAL_STATE },
                    { type: 'DELETE_USER_FAILURE' }
                )
            ).toEqual({
                ...INITIAL_STATE,
                deleteUser: { ...INITIAL_STATE.deleteUser, isLoading: false }
            });
        });
    });

});