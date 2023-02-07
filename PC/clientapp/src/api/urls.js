export const urls = {
    base: 'https://192.168.4.126:7032/',
    baseUrl: 'https://192.168.4.126:7032/api',
    filesUrl: 'https://192.168.4.126:7032/files/excelFiles/',
    register: '/user/register',
    login: '/user/login',
    getAllUsers: 'https://192.168.4.126:7032/api/user/all',
    user: '/user',
    specificUser: '/user/get-a-user-by-id',
    editUserByAdmin: '/user/edit-user-by-admin',
    editUserByUser: '/user/edit-user',
    uploadUserExcelFile: '/user/upload-user-excel-file',
    uploadUserExcelFileByUser: '/user/user-upload-user-excel-file',
    downloadUserExcelFile: '/user/download-user-excel-file',
    downloadUserExcelFileByUser: '/user/download-user-excel-file-by-user'
};

export const statusCodes = {
    unAuthorized: 6
};
