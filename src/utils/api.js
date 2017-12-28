import axios from 'axios';

const BASE_URL = "https://jsonplaceholder.typicode.com";

class Api {
    static get(uri) {
        return axios.get(`${BASE_URL}${uri}`);
    }

    static post(uri, data) {
        return axios.post(`${BASE_URL}${uri}`, data);
    }

    static put(uri, data) {
        return axios.put(`${BASE_URL}${uri}`, data);
    }

    static delete(uri) {
        return axios.delete(`${BASE_URL}${uri}`);
    }
}

export default Api;