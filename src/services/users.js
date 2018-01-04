import Api from '../utils/api';

class UsersService {
    static getUsers() {
        return Api.get('/users');
    }

    static getUser(id) {
        return Api.get(`/users/${id}`);
    }
}

export default UsersService;