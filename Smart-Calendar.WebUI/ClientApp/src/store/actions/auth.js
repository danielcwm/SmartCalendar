import axios from "../../axios-api";
import { toast } from 'react-toastify';
import * as actionTypes from "./actionTypes";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, roleId, accountId, email) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        roleId: roleId,
        accountId: accountId,
        email: email
    };
};

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("roleId");
    localStorage.removeItem("accountId");
    localStorage.removeItem("email");
    toast.info("Successfully Logged Out!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
    });
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password
        };
        axios.post("Account/Login", authData)
            .then(response => {
                if (response.status === 200) {
                    localStorage.setItem("token", response.data.jwtToken);
                    localStorage.setItem("roleId", response.data.roleId.toString());
                    localStorage.setItem("accountId", response.data.accountId);
                    localStorage.setItem("email", email);
                    dispatch(authSuccess(response.data.jwtToken, response.data.roleId.toString(), response.data.accountId, email));
                    toast.info("Welcome!", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true
                    });
                } else {
                    toast.error("Unauthorized", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true
                    });
                }
               
            })
            .catch(err => {
                toast.error("Auth failed", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
                dispatch(authFail(err.toString()));
            });
    };
};

export const setAuthRedirectPath = path => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem("token");
        if (token) {
            const roleId = localStorage.getItem("roleId");
            const accountId = localStorage.getItem("accountId");
            const email = localStorage.getItem("email");
            dispatch(authSuccess(token, roleId, accountId, email));
        }
    };
};
