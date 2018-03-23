import Api from '../utils/api';
import Cookies from 'universal-cookie';
import jwtDecode from 'jwt-decode';

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijk5OSIsImZpcnN0TmFtZSI6IlZpY3RvciIsImxhc3ROYW1lIjoiTWFydGlucyBCZXplcnJhIiwicm9sZSI6Im1hbmFnZXIifQ.gbI7OqoXdGXi_x6aGsGtgRca7CXKLvgjP9qPacYuV7o';
const DELAY = 2000;

const cookies = new Cookies();

class AuthService {
    static login() {
        const response = {
            token: TOKEN
        }

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(response);
            }, DELAY)
        });
    }

    static setToken(token) {
        cookies.set('schedule_token', token, { path: '/' });
    }

    static getToken() {
        return cookies.get('schedule_token');
    }

    static getDecodedToken() {
        return jwtDecode(AuthService.getToken());
    }

    static checkIsLoggedIn() {
        return !!cookies.get('schedule_token'); // check expiration time too!
    }

    static logout() {
        return cookies.remove('schedule_token');
    }
}

export default AuthService;