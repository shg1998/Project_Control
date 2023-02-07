import CryptoJS from 'crypto-js';

const kjdgdfjgfjfdg = 'vzCDrMA7xLS8Xzyk';

export function setItemSecure(key, value) {
    if (value) localStorage.setItem(key, CryptoJS.AES.encrypt(value.toString(CryptoJS.enc.Utf8), kjdgdfjgfjfdg + key));
}

export function getItemSecure(key) {
    const data = localStorage.getItem(key);
    try {
        if (data !== null) return CryptoJS.AES.decrypt(data, kjdgdfjgfjfdg + key).toString(CryptoJS.enc.Utf8);
    } catch (error) {
        localStorage.clear();
    }
    return data;
}
