import * as actionTypes from "../actions/actionTypes";

const initialState = {
    users: null,
    accounts: null,
    currentUser: null
};

const setUsers = (state, action) => {
    return { ...state, users: action.users };
};

const setAccounts = (state, action) => {
    return { ...state, accounts: action.accounts };
};

const getUserInfo = (state, action) => {
    return { ...state, currentUser: action.currentUser };
};

const addUserInfo = (state, action) => {
    return { ...state, users: action.newUsers };
};

const deleteUserInfo = (state, action) => {
    const newUsers = state.users.filter(user => user.id !== action.id);
    return { ...state, users: newUsers };
};

const updateUserInfo = (state, action) => {
    return { ...state, users: action.newUsers, currentUser: action.currentUser };
};

const addAccountInfo = (state, action) => {
    return { ...state, accounts: action.newAccounts };
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_USERS:
            return setUsers(state, action);
        case actionTypes.SET_ACCOUNTS:
            return setAccounts(state, action);
        case actionTypes.GET_USERINFO:
            return getUserInfo(state, action);
        case actionTypes.ADD_USERINFO:
            return addUserInfo(state, action);
        case actionTypes.DELETE_USERINFO:
            return deleteUserInfo(state, action);
        case actionTypes.UPDATE_USERINFO:
            return updateUserInfo(state, action);
        case actionTypes.ADD_ACCOUNTINFO:
            return addAccountInfo(state, action);
        default:
            return state;
    }
};

export default reducer;
