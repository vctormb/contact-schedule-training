import Api from '../utils/api';

class AuthService {
    static login() {
        const response = {
            id: '999',
            firstName: 'Victor',
            lastName: 'Martins Bezera',
        }

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(response);
            }, 2000)
        });
    }
}

export default AuthService;