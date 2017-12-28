import Api from '../utils/api';

class UsersService {
    static getUsers() {
        return Api.get('/users');
    }
}

export default UsersService;