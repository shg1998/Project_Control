import { statusCodes } from 'api/urls';
import { toast } from 'react-toastify';
import { logout } from 'utils/generalUtils';

export const showNotifications = (result) => {
    if (!result.IsSuccess) toast.error(result.Message);
    if (result.isSuccess) toast.success(typeof result.data === 'object' ? result.message : result.data);
    if (parseInt(result.StatusCode) === statusCodes.unAuthorized) {
        logout();
        location.reload();
    }
};
