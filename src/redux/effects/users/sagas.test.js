import React from 'react';
import { call, put } from 'redux-saga/effects';
import UsersService from '../../../services/users';
import { fetchUsers } from './sagas';

describe('fetchUsers() saga effect', () => {
    const gen = fetchUsers();
    const users = {
        data: {}
    } // dummy data

    it('should return the UsersService.getUsers call', () => {
        expect(gen.next().value).toEqual(call(UsersService.getUsers));
    });

    it('should return the FETCH_USERS_SUCCESS action', () => {
        expect(gen.next(users).value).toEqual(put({ type: "FETCH_USERS_SUCCESS", users: users.data }));
    });

    it('should be done', () => {
        expect(gen.next().done).toEqual(true);
    });
});