import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { RegisterUser } from './RegisterUser';
import { shallow, mount } from 'enzyme';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducers from '../../redux/reducers';

let store = createStore(rootReducers);

describe('<RegisterUserForm />', () => {
    const dispatch = jest.fn();

    let props = {
        dispatch,
        match: { params: { id: '' } },
    };

    let registerUser = shallow(<RegisterUser {...props} />);

    it('should render properly', () => {
        expect(registerUser).toMatchSnapshot();
    });

    describe('when componentDidMount()', () => {
        // beforeEach(() => {
        //     registerUser = mount(
        //         <Provider store={store}>
        //             <Router>
        //                 <RegisterUser {...props} />
        //             </Router>
        //         </Provider>
        //     );
        // });

        describe('and there`s no param id', () => {
            

            it('should dispatch REGISTER_USER_RESET action', () => {
                expect(dispatch).toBeCalledWith({ type: 'REGISTER_USER_RESET' });
            });
        });

        describe('and there`s a param id', () => {
            beforeEach(() => {
                props = {
                    ...props,
                    match: { params: { id: 1 } },
                };
                
                registerUser = shallow(<RegisterUser {...props} />);
                // registerUser = mount(
                //     <Provider store={store}>
                //         <Router>
                //             <RegisterUser {...props} />
                //         </Router>
                //     </Provider>
                // );
            });

            it('should dispatch FETCH_USER_REQUEST action', () => {
                expect(dispatch).toBeCalledWith({ type: 'FETCH_USER_REQUEST', payload: { userId: 1 } });
            });
        });
    });
});