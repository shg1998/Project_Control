import { useState } from 'react';
import Delete from '@mui/icons-material/DeleteOutlined';
import Edit from '@mui/icons-material/EditOutlined';
import AddUserIcon from '@mui/icons-material/AddOutlined';
// material-ui
import { Button, Grid, Tooltip } from '@mui/material';
import { urls } from 'api/urls';
import { columns } from './columns';
import { logout } from 'utils/generalUtils';
import { useNavigate } from 'react-router';
import { useTheme } from '@mui/material/styles';
import AlertDialog from 'components/dialogs/AlertDialog';
import { deleteUser, downloadUserExcelFile, uploadExcelFileByAdmin } from 'api/api_user';
import { showNotifications } from 'utils/NotificationUtils';
import { useRef } from 'react';
import CustomDialog from 'components/dialogs/CustomDialog';
import ManageUser from './ManageUser';
import DataTableComponent from '../../../components/DataTable/DataTableComponent';
import TaskIcon from '@mui/icons-material/Download';
import TaskUploadIcon from '@mui/icons-material/Upload';
import { isExcel } from '../../../utils/fileFormatValidationUtil';

const Users = () => {
    const [openConfirmDialog, setConfirmDialogOpen] = useState(false);
    const [openManageDialog, setManageDialogOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [manageDialogTitle, setManageDialogTitle] = useState('افزودن کاربر');
    const manageUserRef = useRef();
    const tableRef = useRef();
    const navigate = useNavigate();
    const theme = useTheme();
    const inputRef = useRef();

    const tableActions = [
        {
            icon: () => (
                <Tooltip title={'حذف کاربر'} arrow>
                    <Delete fontSize="small" />
                </Tooltip>
            ),
            onClick: (event, rowData) => {
                setConfirmDialogOpen(true);
                setSelectedUser(rowData);
            }
        },
        {
            icon: () => (
                <Tooltip title={'ویرایش کاربر'} arrow>
                    <Edit fontSize="small" />
                </Tooltip>
            ),
            position: 'row',
            onClick: (event, rowData) => {
                setSelectedUser(rowData);
                setManageDialogTitle(`🖊 ` + ` ویرایش  "${rowData.userName}"`);
                setManageDialogOpen(true);
            }
        },
        {
            icon: () => (
                <Tooltip title={'دریافت فایل اکسل گزارش عملکرد کاربر'} arrow>
                    <TaskIcon fontSize="small" />
                </Tooltip>
            ),
            position: 'row',
            onClick: (event, rowData) => {
                downloadSelectedUserFile(rowData.id);
            }
        },
        {
            icon: () => (
                <Tooltip title={'بارگذاری فایل اکسل گزارش عملکرد کاربر'} arrow>
                    <TaskUploadIcon fontSize="small" />
                </Tooltip>
            ),
            position: 'row',
            onClick: (event, rowData) => {
                setSelectedUser(rowData);
                openUploadInputFile();
            }
        },
        {
            icon: () => (
                <Tooltip title="افزودن کاربر جدید" placement="top" arrow>
                    <Button
                        sx={{
                            backgroundColor: theme.palette.info.dark,
                            color: theme.palette.common.white,
                            ':hover': {
                                backgroundColor: theme.palette.info.light
                            },
                            ml: 1
                        }}
                        startIcon={<AddUserIcon sx={{ ml: 1 }} />}
                    >
                        ایجاد کاربر
                    </Button>
                </Tooltip>
            ),
            isFreeAction: true,
            onClick: () => {
                setSelectedUser(null);
                setManageDialogTitle(` 👦افزودن کاربر`);
                setManageDialogOpen(true);
            }
        }
    ];

    const downloadSelectedUserFile = (userId) => {
        downloadUserExcelFile(userId).then((res) => {
            if (res.isSuccess) window.open(urls.filesUrl + res.data);
            else showNotifications(res);
        });
    };

    const openUploadInputFile = () => {
        inputRef.current?.click();
    };

    const onDeleteUserBtnConfirmClicked = () => {
        setConfirmDialogOpen(false);
        deleteUser(selectedUser.id).then((res) => {
            showNotifications(res);
            if (res.isSuccess) tableRef.current.onQueryChange();
        });
    };

    const handleCloseDeleteConfirmDialog = () => {
        setConfirmDialogOpen(false);
    };

    const handleCloseManageDialog = () => {
        setManageDialogOpen(false);
    };

    const handleSubmitManageForm = () => {
        manageUserRef.current?.submitClicked();
    };

    const handleSubmittedSuccessfully = () => {
        setManageDialogOpen(false);
        tableRef.current.onQueryChange();
    };

    const handleSubmittedWithFailure = () => {
        setManageDialogOpen(false);
    };

    const getCustomQuery = () => {
        let result = '';
        if (window.location.href.includes('?centralId'))
            result = `UserCentrals/any(c: c/CentralId eq ${parseInt(window.location.href.split('?centralId=')[1])})`;
        return result;
    };

    return (
        <Grid>
            <DataTableComponent
                tableMargin="10px"
                tableRef={tableRef}
                columns={columns}
                urlAddress={urls.getAllUsers}
                title=""
                tableActions={tableActions}
                hideTabelShadow={true}
                customQuery={getCustomQuery()}
            />
            <AlertDialog
                open={openConfirmDialog}
                onYesBtnClicked={onDeleteUserBtnConfirmClicked}
                handleClose={handleCloseDeleteConfirmDialog}
            />
            <CustomDialog
                open={openManageDialog}
                maxWidth={'sm'}
                handleClose={handleCloseManageDialog}
                handleSubmit={handleSubmitManageForm}
                title={manageDialogTitle}
            >
                <ManageUser
                    ref={manageUserRef}
                    submittedSuccessfully={handleSubmittedSuccessfully}
                    submittedWithFailure={handleSubmittedWithFailure}
                    selectedUser={selectedUser}
                />
            </CustomDialog>
            <input
                ref={inputRef}
                hidden
                id="file"
                name="file"
                type="file"
                onChange={(event) => {
                    if (isExcel(event.currentTarget.files[0].name)) {
                        const fileDto = new FormData();
                        fileDto.append('userId', selectedUser.id);
                        fileDto.append('excelFile', event.currentTarget.files[0]);
                        uploadExcelFileByAdmin(fileDto).then((res) => {
                            showNotifications(res);
                        });
                        inputRef.current.value = null;
                    }
                }}
            />
        </Grid>
    );
};

export default Users;
