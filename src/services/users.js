import Api from '../utils/api';

class UsersService {
    static getUsers() {
        return Api.get('/users');
    }

    static getUser(id) {
        return Api.get(`/users/${id}`);
    }

    static deleteUser(id) {
        return Api.delete(`/users/${id}`);
    }
}

export default UsersService;