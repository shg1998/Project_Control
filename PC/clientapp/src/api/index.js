import axios from 'axios';
import { urls } from './urls';
import { getToken } from 'utils/generalUtils';

export const getAxiosBase = () => {
    return axios.create({
        baseURL: urls.baseUrl,
        timeout: 10000
    });
};

export const getAuthorizedAxiosBase = () => {
    let axiosBase = getAxiosBase();
    axiosBase.interceptors.request.use(function (config) {
        const token = 'Bearer ' + getToken();
        config.headers.Authorization = token;
        return config;
    });
    return axiosBase;
};
