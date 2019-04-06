import * as actionTypes from "../actions/actionTypes";

const initialState = {
    users: null,
    accounts: null,
    currentUser: null,
    searchField: ""
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
    return { ...state, users: state.users.filter(user => user.id !== action.id) };
};

const updateUserInfo = (state, action) => {
    return { ...state, users: action.newUsers };
};

const updateUserPartial = (state, action) => {
    return { ...state, users: action.newUsers, currentUser: action.currentUser };
};

const changeSearchField = (state, action) => {
    return { ...state, searchField: action.searchText };
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
        case actionTypes.UPDATE_USERPARTIAL:
            return updateUserPartial(state, action);
        case actionTypes.ADD_ACCOUNTINFO:
            return addAccountInfo(state, action);
        case actionTypes.CHANGE_SEARCH_FIELD:
            return changeSearchField(state, action);
        default:
            return state;
    }
};

export default reducer;
