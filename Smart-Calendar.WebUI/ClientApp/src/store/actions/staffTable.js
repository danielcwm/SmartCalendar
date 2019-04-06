import * as actionTypes from "./actionTypes";
import axios from "../../axios-api";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const initUsers = () => {
    return dispatch => {
        axios
            .get("calendar/user")
            .then(response => {
                dispatch({
                    type: actionTypes.SET_USERS,
                    users: response.data
                });
            })
            .catch(error => {
                console.log(error);
            });
    };
};

export const initAccounts = () => {
    return dispatch => {
        axios.get("calendar/account")
            .then(response => {
                dispatch({
                    type: actionTypes.SET_ACCOUNTS,
                    accounts: response.data
                }
                );
            }).catch(error => {
                console.log(error);
            });
    };
};

export const addAccount = newAccount => {
    return dispatch => {
        axios
            .post("account/register", newAccount)
            .then(response => {
                dispatch(
                    {
                        type: actionTypes.ADD_ACCOUNTINFO,
                        newAccounts: response.data
                    });
                toast.info("User Account Created", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
            })
            .catch(error => {
                console.log(error);
            });
    };
};

export const getUserInfo = id => {
    return dispatch => {
        axios.get("calendar/user/" + id)
            .then(response => {
                dispatch({
                    type: actionTypes.GET_USERINFO,
                    currentUser: response.data
                });
            }).catch(error => {
                console.log(error);
            });
    };
};

export const addUserInfo = userInfo => {
    return dispatch => {
        axios
            .post("calendar/user", userInfo)
            .then(response => {
                dispatch(
                    {
                        type: actionTypes.ADD_USERINFO,
                        newUsers: response.data.value
                    });
                toast.info("User Info Added!!", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
            })
            .catch(error => {
                console.log(error);
            });
    };
};

export const deleteUserInfo = id => {
    return dispatch => {
        axios
            .delete("calendar/user/" + id)
            .then(response => {
                dispatch({
                    type: actionTypes.DELETE_USERINFO,
                    id: id
                });
                toast.warn("User Info Deleted!!", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
            })
            .catch(error => {
                console.log(error);
            });
    };
};

export const updateUserInfo = updatedUser => {
    return dispatch => {
        axios.put("calendar/user/" + updatedUser.userId, updatedUser)
            .then(response => {
                dispatch({
                    type: actionTypes.UPDATE_USERINFO,
                    newUsers: response.data.value
                });
                toast.info("User Info Updated!!", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
            }).catch(error => {
                console.log(error);
            });

    };
};

export const updateUserPartial = updatedUser => {
    return dispatch => {
        axios.put("calendar/userPartial/" + updatedUser.userId, updatedUser)
            .then(response => {
                dispatch({
                    type: actionTypes.UPDATE_USERPARTIAL,
                    newUsers: response.data.value,
                    currentUser: updatedUser
                });
                toast.info("User Name is Updated", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true
                });
            }).catch(error => {
                console.log(error);
            });
    };
};

export const setSearchField = text => {
    return {
        type: actionTypes.CHANGE_SEARCH_FIELD,
        searchText: text
    };
};

