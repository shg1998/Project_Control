import React from 'react';
import { loginApi, registerApi } from '../api/api_auth';
import { toast } from 'react-toastify';
import { getItemSecure, setItemSecure } from '../utils/criptStorage';

let UserStateContext = React.createContext();
let UserDispatchContext = React.createContext();

function userReducer(state, action) {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                isAuthenticated: true,
                isAdmin: getItemSecure('us_inf') ? JSON.parse(getItemSecure('us_inf')?.toString()).userRoleName === 'Admin' : false,
                isSuperAdmin: getItemSecure('us_inf')
                    ? JSON.parse(getItemSecure('us_inf')?.toString()).userRoleName === 'SuperAdmin'
                    : false
            };
        case 'SIGN_OUT_SUCCESS':
            return { ...state, isAuthenticated: false, isAdmin: false };
        default: {
            throw new Error(`Unhandled action type: ${action.type}`);
        }
    }
}

function UserProvider({ children }) {
    let [state, dispatch] = React.useReducer(userReducer, {
        isAuthenticated: !!getItemSecure('id_token'), //!!localStorage.getItem('id_token'),
        isAdmin: getItemSecure('us_inf') ? JSON.parse(getItemSecure('us_inf')?.toString()).userRoleName === 'Admin' : false,
        isSuperAdmin: getItemSecure('us_inf') ? JSON.parse(getItemSecure('us_inf')?.toString()).userRoleName === 'SuperAdmin' : false
    });

    return (
        <UserStateContext.Provider value={state}>
            <UserDispatchContext.Provider value={dispatch}>{children}</UserDispatchContext.Provider>
        </UserStateContext.Provider>
    );
}

function useUserState() {
    let context = React.useContext(UserStateContext);
    if (context === undefined) {
        throw new Error('useUserState must be used within a UserProvider');
    }
    return context;
}

function useUserDispatch() {
    let context = React.useContext(UserDispatchContext);
    if (context === undefined) {
        throw new Error('useUserDispatch must be used within a UserProvider');
    }
    return context;
}

export { UserProvider, useUserState, useUserDispatch, loginUser, signOut, registerUser };

// ###########################################################

async function loginUser(dispatch, login, password, history, setIsLoading, setError) {
    setError(false);
    setIsLoading(true);

    if (!!login && !!password) {
        await loginApi(login, password)
            .then((res) => {
                if (res.isSuccess) {
                    setItemSecure('id_token', res.data.token);
                    setItemSecure('us_inf', JSON.stringify(res.data));
                    setIsLoading(false);
                    dispatch({ type: 'LOGIN_SUCCESS' });
                    history.push('/');
                    toast.success('با موفقیت وارد شدید');
                } else {
                    setIsLoading(false);
                    toast.error(res.Message);
                }
            })
            .catch((err) => {
                setIsLoading(false);
                toast.error('با این مشخصات قادر به ورود نیستید.');
            });
    } else {
        setIsLoading(false);
        toast.error('همه مقادیر بایستی وارد شود');
    }
}

async function registerUser(username, email, password, fullname, history, setIsLoading, setError) {
    setError(false);
    setIsLoading(true);

    if (!!username && !!email && !!password && !!fullname) {
        await registerApi(username, email, password, fullname)
            .then((res) => {
                if (res) {
                    setIsLoading(false);
                    if (res.isSuccess) {
                        toast.success('شما با موفقیت در سیستم ثبت نام کرده اید. اکنون می توانید از منوی ورود به برنامه وارد شوید.');
                        setTimeout(() => {
                            history.push('/');
                            location.reload();
                        }, 1000);
                    } else {
                        toast.error(res.Message);
                    }
                }
            })
            .catch((err) => {
                setIsLoading(false);
                console.log(err);
                toast.error(err.message);
            });
    } else {
        setIsLoading(false);
        toast.error('همه مقادیر بایستی وارد شود');
    }
}

function signOut(dispatch, history) {
    localStorage.clear();
    dispatch({ type: 'SIGN_OUT_SUCCESS' });
    history.push('/login');
}
