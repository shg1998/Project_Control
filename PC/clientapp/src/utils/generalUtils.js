import { getItemSecure } from './criptStorage';

export const getToken = () => getItemSecure('id_token');

export const logout = () => {
    localStorage.clear();
};

export function capitalizeWordFirstLetter(str) {
    let result = '';
    if (str.includes('.')) {
        let sections = str.split('.');
        sections.forEach((section, i) => {
            result += capitalizeHelper(section);
            if (i !== sections.length - 1) result += '/';
        });
    } else result = capitalizeHelper(str);
    return result;
}

function capitalizeHelper(str) {
    return str.toString().charAt(0).toUpperCase() + str.substr(1);
}

export function smallizeHelper(str) {
    return str.toString().charAt(0).toLowerCase() + str.substr(1);
}
