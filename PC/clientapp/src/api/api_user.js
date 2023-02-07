import { getAuthorizedAxiosBase } from 'api';
import { urls } from './urls';

export const deleteUser = async (id) => {
    return getAuthorizedAxiosBase()
        .delete(urls.user + `?id=${id}`)
        .then((res) => res.data)
        .catch((err) => err.response.data);
};

export const addUser = async (userDto) => {
    return getAuthorizedAxiosBase()
        .post(urls.user, userDto)
        .then((res) => res.data)
        .catch((err) => err.response.data);
};

export const getSpecificUserData = async (id) => {
    return getAuthorizedAxiosBase()
        .get(urls.specificUser + `/${id}`)
        .then((res) => res.data)
        .catch((err) => err.response.data);
};

export const editUserByAdmin = async (id, userDto) => {
    return getAuthorizedAxiosBase()
        .put(urls.editUserByAdmin + `/${id}`, userDto)
        .then((res) => res.data)
        .catch((err) => err.response.data);
};

export const editUserByUser = async (userDto) => {
    return getAuthorizedAxiosBase()
        .put(urls.editUserByUser, userDto)
        .then((res) => res.data)
        .catch((err) => err.response.data);
};

export const uploadExcelFileByAdmin = async (fileDto) => {
    return getAuthorizedAxiosBase()
        .post(urls.uploadUserExcelFile, fileDto)
        .then((res) => res.data)
        .catch((err) => err.response.data);
};

export const uploadExcelFileByUser = async (fileDto) => {
    return getAuthorizedAxiosBase()
        .post(urls.uploadUserExcelFileByUser, fileDto)
        .then((res) => res.data)
        .catch((err) => err.response.data);
};

export const downloadUserExcelFile = async (userId) => {
    return getAuthorizedAxiosBase()
        .get(urls.downloadUserExcelFile + `?userId=${userId}`)
        .then((res) => res.data)
        .catch((err) => err.response.data);
};

export const downloadUserExcelFileByUser = async () => {
    return getAuthorizedAxiosBase()
        .get(urls.downloadUserExcelFileByUser)
        .then((res) => res.data)
        .catch((err) => err.response.data);
};
