import { toast } from 'react-toastify';

function getExtension(filename) {
    let parts = filename.split('.');
    return parts[parts.length - 1];
}

export function isExcel(filename) {
    let ext = getExtension(filename);
    switch (ext.toLowerCase()) {
        case 'xls':
        case 'xlsx':
            return true;
    }
    toast.error('!فرمت فایل نامعتبر است');
}
