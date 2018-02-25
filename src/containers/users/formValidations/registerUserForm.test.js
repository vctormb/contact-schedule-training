import { validateForm } from './registerUserForm';

describe('registerUserForm validations', () => {
    const validForm = {
        name: 'Foo User',
        email: 'email@email.com'
    }

    it('should check if entire form is valid', () => {
        expect(validateForm(validForm)).toEqual({});
    });

    describe('when user make actions in `name` field', () => {
        it('should check if `name` is required', () => {
            expect(validateForm({})).toHaveProperty('name');
        });
    });

    describe('when user make actions in `email` field', () => {
        it('should check if `email` is required', () => {
            expect(validateForm({})).toHaveProperty('email');
        });

        it('should check if `email` is invalid', () => {
            expect(validateForm({ email: 'email' })).toHaveProperty('email');
            expect(validateForm({ email: 'email@' })).toHaveProperty('email');
            expect(validateForm({ email: 'email@com' })).toHaveProperty('email');
        });
    });

});