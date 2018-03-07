import React from 'react';
import { call, put } from 'redux-saga/effects';
import UsersService from '../../services/users';
import { fetchUsers, deleteUser } from './sagas';
import { cloneableGenerator } from 'redux-saga/utils';

describe('Users sagas', () => {
    const genFetchUsers = cloneableGenerator(fetchUsers)();
    const users = { data: {} } // dummy data

    const payload = { payload: { userId: 1 } }; // dummy data
    const genDeleteUser = cloneableGenerator(deleteUser)(payload);

    const catchError = { e: { message: "" } };

    describe('when fetchUsers() is called', () => {
        const genFetchUsersClone1 = genFetchUsers.clone();

        it('should return the UsersService.getUsers() call', () => {
            expect(genFetchUsersClone1.next().value).toEqual(call(UsersService.getUsers));
        });

        it('should return the FETCH_USERS_SUCCESS action', () => {
            expect(genFetchUsersClone1.next(users).value).toEqual(put({ type: "FETCH_USERS_SUCCESS", users: users.data }));
        });

        it('should be done', () => {
            expect(genFetchUsersClone1.next().done).toEqual(true);
        });

        describe('and an error occurs', () => {
            const genFetchUsersClone2 = genFetchUsers.clone();

            it('should return the UsersService.getUsers() call', () => {
                expect(genFetchUsersClone2.next().value).toEqual(call(UsersService.getUsers));
            });

            it('should return the DELETE_USER_FAILURE action', () => {
                expect(genFetchUsersClone2.throw(catchError.e).value).toEqual(put({ type: 'FETCH_USERS_FAILURE', message: catchError.e.message }))
            });
        });
    });

    describe('when deleteUser() is called', () => {
        const genDeleteUserClone1 = genDeleteUser.clone();

        it('should return the UsersService.deleteUser() call', () => {
            expect(genDeleteUserClone1.next().value).toEqual(call(UsersService.deleteUser, payload.payload.userId));
        });

        it('should return the DELETE_USER_SUCCESS action', () => {
            expect(genDeleteUserClone1.next().value).toEqual(put({ type: 'DELETE_USER_SUCCESS', userId: payload.payload.userId }));
        });

        it('should be done', () => {
            expect(genDeleteUserClone1.next().done).toEqual(true);
        });

        describe('and an error occurs', () => {
            const genDeleteUserClone2 = genDeleteUser.clone();
            
            it('should return the UsersService.deleteUser() call', () => {
                expect(genDeleteUserClone2.next().value).toEqual(call(UsersService.deleteUser, payload.payload.userId));
            });
            
            it('should return the DELETE_USER_FAILURE action', () => {
                expect(genDeleteUserClone2.throw(catchError.e).value).toEqual(put({ type: 'DELETE_USER_FAILURE', message: catchError.e.message }))
            });

            it('should be done', () => {
                expect(genDeleteUserClone2.next().done).toEqual(true);
            });
        });
    });


});