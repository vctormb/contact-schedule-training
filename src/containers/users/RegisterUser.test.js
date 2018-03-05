import React from 'react';
import { shallow } from 'enzyme';

import { RegisterUser } from './RegisterUser';
import RegisterUserForm from './RegisterUserForm';

import rootReducers from '../../redux/reducers';

describe('<RegisterUserForm />', () => {
    const dispatch = jest.fn();
    const push = jest.fn();

    let props = {
        dispatch,
        match: { params: { id: '' } },
        history: { push },
    };

    let registerUser = shallow(<RegisterUser {...props} />);

    it('should render properly', () => {
        expect(registerUser).toMatchSnapshot();
    });

    describe('when componentDidMount()', () => {
        it('should dispatch REGISTER_USER_RESET action', () => {
            expect(dispatch).toBeCalledWith({ type: 'REGISTER_USER_RESET' });
        });

        describe('and there`s a param id', () => {
            beforeEach(() => {
                dispatch.mockClear();

                props = {
                    ...props,
                    match: { params: { id: 1 } },
                };

                registerUser = shallow(<RegisterUser {...props} />);

            });

            it('should dispatch FETCH_USER_REQUEST action', () => {
                expect(dispatch).toBeCalledWith({ type: 'FETCH_USER_REQUEST', payload: { userId: 1 } });
            });
        });
    });

    describe('when the form is submitted', () => {
        beforeEach(() => {
            dispatch.mockClear();
            registerUser.find(RegisterUserForm).simulate('submit');
        });

        it('should dispatch ADD_USER_REQUEST action', () => {
            expect(dispatch).toHaveBeenCalledWith({type: 'ADD_USER_REQUEST', push: props.history.push })
        });
    });
});