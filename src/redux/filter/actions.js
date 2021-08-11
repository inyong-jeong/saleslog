// @flow
import {
    SET_ACCOUNTS,
    SET_USERS,
    ON_DELETED_USER,
    SET_FROM_DATE,
    SET_TO_DATE,
    SET_PAGE
} from 'constants/actionTypes';

export const setAccounts = (accounts) => ({
    type: SET_ACCOUNTS,
    payload: { accounts }
});

export const setUsers = (users) => ({
    type: SET_USERS,
    payload: { users }
});

export const onDeletedUser = (user) => ({
    type: ON_DELETED_USER,
    payload: { user }
});

export const setFromDate = (fromDate) => ({
    type: SET_FROM_DATE,
    payload: { fromDate }
});

export const setToDate = (toDate) => ({
    type: SET_TO_DATE,
    payload: { toDate }
});

export const setPage = (page) => ({
    type: SET_PAGE,
    payload: { page } 
});