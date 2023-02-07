import React, { useState, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    Divider,
    FormControl,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Typography,
    useMediaQuery
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useScriptRef from 'hooks/useScriptRef';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AnimateButton from '../../../components/extended/AnimateButton';
import { getItemSecure, setItemSecure } from '../../../utils/criptStorage';
import { useNavigate } from 'react-router-dom';
import CustomDividerComponent from '../../../components/Divider/CustomDividerComponent';
import { useSelector } from 'react-redux';
import { editUserByUser } from '../../../api/api_user';
import { showNotifications } from '../../../utils/NotificationUtils';

const EditProfile = ({ ...others }) => {
    const theme = useTheme();
    const scriptedRef = useScriptRef();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const [showPassword, setShowPassword] = useState(false);
    const [showOldPassword, setOldShowPassword] = useState(false);
    const [showConfirmationPassword, setShowConfirmationPassword] = useState(false);
    const [strength, setStrength] = useState(0);
    const [level, setLevel] = useState();
    const navigate = useNavigate();
    const customization = useSelector((state) => state.customization);

    const handleClickShowOldPassword = () => {
        setOldShowPassword(!showOldPassword);
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleClickShowConfirmationPassword = () => {
        setShowConfirmationPassword(!showConfirmationPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const changePassword = (value) => {
        const temp = strengthIndicator(value);
        setStrength(temp);
        setLevel(strengthColor(temp));
    };

    const returnToHomePage = () => {
        navigate('/');
    };

    useEffect(() => {
        changePassword('123456');
    }, []);

    return (
        <Grid container>
            <Grid item xs={0} sm={2} md={3} lg={4} />
            <Grid item xs={12} sm={8} md={6} lg={4} sx={{ backgroundColor: '#fcfcfc', padding: '15px', borderRadius: '13px' }}>
                <br />
                <CustomDividerComponent customization={customization} caption={'ویرایش اطلاعات کاربری'} theme={theme} />
                <br />
                <Formik
                    enableReinitialize
                    initialValues={{
                        fullname: JSON.parse(getItemSecure('us_inf').toString()).fullName,
                        username: JSON.parse(getItemSecure('us_inf').toString()).userName,
                        email: JSON.parse(getItemSecure('us_inf').toString()).email,
                        password: '',
                        passwordConfirmation: '',
                        oldPassword: ''
                    }}
                    validationSchema={Yup.object().shape({
                        fullname: Yup.string().max(150).required('نام و نام خانوادگی الزامی است!'),
                        username: Yup.string().max(150).required('نام کاربری الزامی است!'),
                        email: Yup.string().email('باید یک آدرس ایمیل معتبر باشد!').max(255).required('وارد کردن ایمیل الزامی است!'),
                        password: Yup.string()
                            .min(8, 'رمز عبور باید دارای 8 کاراکتر یا بیشتر باشد!')
                            .matches(/[0-9]/, 'رمز عبور باید شامل اعداد باشد!'),
                        passwordConfirmation: Yup.string()
                            .oneOf([Yup.ref('password'), null], 'تکرار رمز عبور و رمز عبور باید یکسان باشند!')
                            .when('password', (password, schema) => {
                                if (password) return schema.required('تکرار رمز عبور و رمز عبور باید یکسان باشند!');
                                return schema;
                            }),
                        oldPassword: Yup.string()
                            .min(8, 'رمز عبور باید دارای 8 کاراکتر یا بیشتر باشد!')
                            .matches(/[0-9]/, 'رمز عبور باید شامل اعداد باشد!')
                            .when('password', (password, schema) => {
                                if (password) return schema.required('رمز عبور قبلی را وارد کنید!');
                                return schema;
                            })
                    })}
                    onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                        try {
                            if (scriptedRef.current) {
                                setStatus({ success: true });
                                let userDto = {
                                    userName: values.username,
                                    email: values.email,
                                    fullName: values.fullname,
                                    oldPassword: values.oldPassword,
                                    newPassword: values.password
                                };
                                editUserByUser(userDto).then((res) => {
                                    showNotifications(res);
                                    if (res.isSuccess) {
                                        navigate('/');
                                        setItemSecure('id_token', res.data.token);
                                        setItemSecure('us_inf', JSON.stringify(res.data));
                                    }
                                });
                                setSubmitting(false);
                            }
                        } catch (err) {
                            console.error(err);
                            if (scriptedRef.current) {
                                setStatus({ success: false });
                                setErrors({ submit: err.message });
                                setSubmitting(false);
                            }
                        }
                    }}
                >
                    {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                        <form noValidate onSubmit={handleSubmit} {...others}>
                            <Grid container spacing={matchDownSM ? 0 : 2}>
                                <Grid item xs={12} sm={6}>
                                    <FormControl
                                        fullWidth
                                        error={Boolean(touched.fullname && errors.fullname)}
                                        sx={{ ...theme.typography.customInput }}
                                    >
                                        <InputLabel htmlFor="outlined-adornment-fullname-register">نام و نام خانوادگی</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-fullname-register"
                                            type="text"
                                            value={values.fullname}
                                            name="fullname"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            inputProps={{}}
                                        />
                                        {touched.fullname && errors.fullname && (
                                            <FormHelperText error id="standard-weight-helper-text--register">
                                                {errors.fullname}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl
                                        fullWidth
                                        error={Boolean(touched.username && errors.username)}
                                        sx={{ ...theme.typography.customInput }}
                                    >
                                        <InputLabel htmlFor="outlined-adornment-username-register">نام کاربری</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-username-register"
                                            type="text"
                                            value={values.username}
                                            name="username"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            inputProps={{}}
                                        />
                                        {touched.username && errors.username && (
                                            <FormHelperText error id="standard-weight-helper-text--register">
                                                {errors.username}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </Grid>
                            </Grid>

                            <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
                                <InputLabel htmlFor="outlined-adornment-email-register">آدرس ایمیل</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-email-register"
                                    type="email"
                                    value={values.email}
                                    name="email"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    inputProps={{}}
                                />
                                {touched.email && errors.email && (
                                    <FormHelperText error id="standard-weight-helper-text--register">
                                        {errors.email}
                                    </FormHelperText>
                                )}
                            </FormControl>

                            <FormControl
                                fullWidth
                                error={Boolean(touched.oldPassword && errors.oldPassword)}
                                sx={{ ...theme.typography.customInput }}
                            >
                                <InputLabel htmlFor="outlined-adornment-password-register">رمز عبور قیلی</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password-register"
                                    type={showOldPassword ? 'text' : 'password'}
                                    value={values.oldPassword}
                                    name="oldPassword"
                                    label="oldPassword"
                                    onBlur={handleBlur}
                                    onChange={(e) => {
                                        handleChange(e);
                                    }}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowOldPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                                size="large"
                                            >
                                                {showOldPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    inputProps={{}}
                                />
                                {touched.oldPassword && errors.oldPassword && (
                                    <FormHelperText error id="standard-weight-helper-text-password-register">
                                        {errors.oldPassword}
                                    </FormHelperText>
                                )}
                            </FormControl>

                            <FormControl
                                fullWidth
                                error={Boolean(touched.password && errors.password)}
                                sx={{ ...theme.typography.customInput }}
                            >
                                <InputLabel htmlFor="outlined-adornment-password-register">رمز عبور</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password-register"
                                    type={showPassword ? 'text' : 'password'}
                                    value={values.password}
                                    name="password"
                                    label="Password"
                                    onBlur={handleBlur}
                                    onChange={(e) => {
                                        handleChange(e);
                                        changePassword(e.target.value);
                                    }}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                                size="large"
                                            >
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    inputProps={{}}
                                />
                                {touched.password && errors.password && (
                                    <FormHelperText error id="standard-weight-helper-text-password-register">
                                        {errors.password}
                                    </FormHelperText>
                                )}
                            </FormControl>

                            <FormControl
                                fullWidth
                                error={Boolean(touched.passwordConfirmation && errors.passwordConfirmation)}
                                sx={{ ...theme.typography.customInput }}
                            >
                                <InputLabel htmlFor="outlined-adornment-reEnter-password-register">تکرار رمز عبور</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-reEnter-password-register"
                                    type={showConfirmationPassword ? 'text' : 'password'}
                                    value={values.passwordConfirmation}
                                    name="passwordConfirmation"
                                    label="passwordConfirmation"
                                    onBlur={handleBlur}
                                    onChange={(e) => {
                                        handleChange(e);
                                    }}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle confirmation password visibility"
                                                onClick={handleClickShowConfirmationPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                                size="large"
                                            >
                                                {showConfirmationPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    inputProps={{}}
                                />
                                {touched.passwordConfirmation && errors.passwordConfirmation && (
                                    <FormHelperText error id="standard-weight-helper-text-password-register">
                                        {errors.passwordConfirmation}
                                    </FormHelperText>
                                )}
                            </FormControl>

                            {strength !== 0 && (
                                <FormControl fullWidth>
                                    <Box sx={{ mb: 2 }}>
                                        <Grid container spacing={2} alignItems="center">
                                            <Grid item>
                                                <Box
                                                    style={{ backgroundColor: level?.color }}
                                                    sx={{ width: 85, height: 8, borderRadius: '7px' }}
                                                />
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="subtitle1" fontSize="0.75rem">
                                                    {level?.label}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </FormControl>
                            )}
                            {errors.submit && (
                                <Box sx={{ mt: 3 }}>
                                    <FormHelperText error>{errors.submit}</FormHelperText>
                                </Box>
                            )}

                            <Box sx={{ mt: 2 }}>
                                <AnimateButton>
                                    <Button
                                        disableElevation
                                        disabled={isSubmitting}
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        color="secondary"
                                    >
                                        اعمال تغییرات
                                    </Button>
                                </AnimateButton>
                            </Box>
                        </form>
                    )}
                </Formik>
                <Box sx={{ mt: 2 }}>
                    <AnimateButton>
                        <Button onClick={returnToHomePage} fullWidth size="large" type="submit" variant="contained" color="primary">
                            لغو عملیات و بازگشت به صفحه اصلی
                        </Button>
                    </AnimateButton>
                </Box>
            </Grid>
            <Grid item xs={0} sm={2} md={3} lg={4} />
        </Grid>
    );
};

export default EditProfile;
