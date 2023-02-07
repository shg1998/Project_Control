import { getAxiosBase } from './index';
import { urls } from './urls';

export const registerApi = async (username, email, password, fullname) => {
    return getAxiosBase()
        .post(urls.register, { username, email, password, fullname })
        .then((res) => res.data)
        .catch((err) => err.response.data);
};

export const loginApi = async (username, password) => {
    return getAxiosBase()
        .post(urls.login, { username, password })
        .then((res) => res.data)
        .catch((err) => err.response.data);
};
