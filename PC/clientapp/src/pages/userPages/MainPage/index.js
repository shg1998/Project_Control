import { Avatar, Grid, Tooltip, Typography } from '@mui/material';
import TaskUploadIcon from '@mui/icons-material/Upload';
import TaskIcon from '@mui/icons-material/Download';
import { useRef } from 'react';
import { isExcel } from '../../../utils/fileFormatValidationUtil';
import { downloadUserExcelFileByUser, uploadExcelFileByUser } from '../../../api/api_user';
import { showNotifications } from '../../../utils/NotificationUtils';
import { urls } from '../../../api/urls';

const MainPage = () => {
    const inputRef = useRef();

    const handleUploadClicked = () => {
        inputRef.current?.click();
    };

    const handleDownloadFile = () => {
        downloadUserExcelFileByUser().then((res) => {
            if (res.isSuccess) window.open(urls.filesUrl + res.data);
            else showNotifications(res);
        });
    };

    return (
        <Grid container>
            <Grid item xs={0} sm={2} md={3} lg={3} />
            <Grid item xs={12} sm={8} md={6} lg={6}>
                <br />
                <Typography sx={{ textAlign: 'center' }} variant={'h1'}>
                    کنترل پروژه واحد تحقیقات (R&D) 💻
                </Typography>
                <br />
                <hr />
                <br />
                <Typography sx={{ textAlign: 'center' }} variant={'h4'}>
                    به منظور بارگذاری فایل گزارش کار خود (فایل اکسل)، بر روی گزینه بارگذاری فایل کلیک نمایید.
                </Typography>
                <br />
                <Typography sx={{ textAlign: 'center' }} variant={'h4'}>
                    همچنین جهت دریافت فایل گزارش کار خود، بر روی گزینه دریافت فایل کلیک نمایید.
                </Typography>
                <br />
                <br />
                <Grid container>
                    <Grid item xs={6} sx={{ textAlign: '-webkit-center' }}>
                        <Tooltip title={'بارگذاری فایل'} arrow>
                            <Avatar
                                onClick={handleUploadClicked}
                                sx={{
                                    bgcolor: '#f0f2f5',
                                    width: '200px',
                                    height: '200px',
                                    boxShadow: '0 8px 10px 0 black',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        boxShadow: '0 8px 20px 0 black',
                                        transition: 'all 0.2s ease-in'
                                    }
                                }}
                            >
                                <TaskUploadIcon sx={{ fontSize: '95px' }} />
                            </Avatar>
                        </Tooltip>
                    </Grid>
                    <Grid item xs={6} sx={{ textAlign: '-webkit-center' }}>
                        <Tooltip title={'دریافت فایل'} arrow>
                            <Avatar
                                onClick={handleDownloadFile}
                                sx={{
                                    bgcolor: '#f0f2f5',
                                    width: '200px',
                                    height: '200px',
                                    boxShadow: '0 8px 10px 0 black',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        boxShadow: '0 8px 20px 0 black',
                                        transition: 'all 0.2s ease-in'
                                    }
                                }}
                            >
                                <TaskIcon sx={{ fontSize: '95px' }} />
                            </Avatar>
                        </Tooltip>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={0} sm={2} md={3} lg={3} />
            <input
                ref={inputRef}
                hidden
                id="file"
                name="file"
                type="file"
                onChange={(event) => {
                    if (isExcel(event.currentTarget.files[0].name)) {
                        const fileDto = new FormData();
                        fileDto.append('excelFile', event.currentTarget.files[0]);
                        uploadExcelFileByUser(fileDto).then((res) => {
                            showNotifications(res);
                        });
                        inputRef.current.value = null;
                    }
                }}
            />
        </Grid>
    );
};

export default MainPage;
