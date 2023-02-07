import { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Typography,
    useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Formik } from 'formik';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import AnimateButton from 'components/extended/AnimateButton';
import * as Yup from 'yup';
import { strengthColor, strengthIndicator } from 'utils/password-strength';
import { useRef } from 'react';
import { useImperativeHandle } from 'react';
import { forwardRef } from 'react';
import { addUser, editUserByAdmin } from 'api/api_user';
import { showNotifications } from 'utils/NotificationUtils';
import PropTypes from 'prop-types';
import { useUserState } from '../../../context/UserContext';

const USER_INF = {
    fullname: '',
    username: '',
    email: '',
    password: '',
    isAdmin: false,
    isActive: false
};

const ManageUser = forwardRef(({ actionButtons, ...props }, ref) => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const [showPassword, setShowPassword] = useState(false);
    const [strength, setStrength] = useState(0);
    const [userInformation, setUserInformation] = useState(USER_INF);
    const [level, setLevel] = useState();
    const buttonRef = useRef();
    let { isSuperAdmin } = useUserState();

    useImperativeHandle(ref, () => ({
        submitClicked
    }));

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const changePassword = (value) => {
        const temp = strengthIndicator(value);
        setStrength(temp);
        setLevel(strengthColor(temp));
    };

    const submitClicked = () => {
        buttonRef.current?.click();
    };

    const fetchIfUserSelected = () => {
        if (props.selectedUser) {
            setUserInformation({
                email: props.selectedUser.email,
                fullname: props.selectedUser.fullName,
                isActive: props.selectedUser.isActive,
                username: props.selectedUser.userName,
                password: ''
            });
        }
    };

    useEffect(() => {
        fetchIfUserSelected();
        changePassword('123456');
    }, []);

    return (
        <>
            <Formik
                enableReinitialize
                initialValues={userInformation}
                validationSchema={Yup.object().shape({
                    fullname: Yup.string().max(150).required('نام و نام خانوادگی اجباری است.'),
                    username: Yup.string().max(150).required('نام کاربری اجباری است.'),
                    email: Yup.string().email('باید ایمیل معتبر وارد شود!').max(255).required('ایمیل الزامی است.'),
                    password: !props.selectedUser
                        ? Yup.string()
                              .max(255)
                              .required('رمز عبور الزامی است.')
                              .min(8, 'رمز عبور باید دارای 8 کاراکتر یا بیشتر باشد!')
                              .matches(/[0-9]/, 'رمز عبور باید شامل اعداد باشد!')
                        : Yup.string()
                              .max(255)
                              .min(8, 'رمز عبور باید دارای 8 کاراکتر یا بیشتر باشد!')
                              .matches(/[0-9]/, 'رمز عبور باید شامل اعداد باشد!')
                })}
                onSubmit={async (values) => {
                    let userDto = {
                        userName: values.username,
                        email: values.email,
                        password: values.password,
                        fullName: values.fullname,
                        isActive: userInformation.isActive
                    };
                    // if(isSuperAdmin)
                    //     userDto.userRoleName =  userInformation.isAdmin ? 'Admin' : '';
                    if (!props.selectedUser) {
                        addUser(userDto).then((res) => {
                            showNotifications(res);
                            if (res.isSuccess) props.submittedSuccessfully();
                            else props.submittedWithFailure();
                        });
                    } else {
                        editUserByAdmin(props.selectedUser.id, userDto).then((res) => {
                            showNotifications(res);
                            if (res.isSuccess) props.submittedSuccessfully();
                            else props.submittedWithFailure();
                        });
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit}>
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
                                        onChange={(e) => {
                                            handleChange(e);
                                            setUserInformation({ ...userInformation, fullname: e.target.value });
                                        }}
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
                                        onChange={(e) => {
                                            handleChange(e);
                                            setUserInformation({ ...userInformation, username: e.target.value });
                                        }}
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
                                onChange={(e) => {
                                    handleChange(e);
                                    setUserInformation({ ...userInformation, email: e.target.value });
                                }}
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
                                    handleChange(e);
                                    setUserInformation({ ...userInformation, password: e.target.value });
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
                        <Grid container sx={{ margin: '10px' }}>
                            <Grid item xs={12} sm={6} md={6} lg={6}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={userInformation.isActive}
                                            onChange={(event) =>
                                                setUserInformation({
                                                    ...userInformation,
                                                    isActive: event.target.checked
                                                })
                                            }
                                            name="checked"
                                            color="primary"
                                        />
                                    }
                                    label="آیا کاربر فعال است؟"
                                />
                            </Grid>
                            {isSuperAdmin && (
                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={userInformation.isAdmin}
                                                onChange={(event) =>
                                                    setUserInformation({
                                                        ...userInformation,
                                                        isAdmin: event.target.checked
                                                    })
                                                }
                                                name="checked"
                                                color="primary"
                                            />
                                        }
                                        label="Is Admin ?"
                                    />
                                </Grid>
                            )}
                        </Grid>

                        {errors.submit && (
                            <Box sx={{ mt: 3 }}>
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Box>
                        )}

                        <Box sx={{ mt: 2 }} hidden>
                            <AnimateButton>
                                <Button
                                    ref={buttonRef}
                                    disableElevation
                                    disabled={isSubmitting}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                />
                            </AnimateButton>
                        </Box>
                    </form>
                )}
            </Formik>
        </>
    );
});

ManageUser.propTypes = {
    selectedUser: PropTypes.object.isRequired,
    submittedSuccessfully: PropTypes.func.isRequired,
    submittedWithFailure: PropTypes.func.isRequired
};

export default ManageUser;
