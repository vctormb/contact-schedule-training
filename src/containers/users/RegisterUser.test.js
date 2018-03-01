import React from 'react';
import PropTypes from 'prop-types';
import { RegisterUser } from './RegisterUser';
import { shallow, mount } from 'enzyme';

import createRouterContext from 'react-router-test-context';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducers from '../../redux/reducers';

let store = createStore(rootReducers);

describe('<RegisterUserForm />', () => {
    const dispatch = jest.fn();

    let props = {
        dispatch,
        match: { params: { id: 0 } },
    };

    const context = createRouterContext();
    RegisterUser.contextTypes = {
        router: PropTypes.object
    }

    let registerUser = shallow(<RegisterUser {...props} />);

    it('should render properly', () => {
        expect(registerUser).toMatchSnapshot();
    });

    // START
    
    describe('when componentDidMount()', () => { // <----------------
        beforeEach(() => {
            registerUser = mount(
                <Provider store={store}>
                    <RegisterUser {...props} />
                </Provider>,
                { context }
            );
        });

        it('should dispatch REGISTER_USER_RESET action', () => { 
            expect(dispatch).toBeCalledWith({ type: 'REGISTER_USER_RESET' });
        });
    });

    // END
});