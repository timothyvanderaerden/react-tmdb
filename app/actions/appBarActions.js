import * as types from '../constants/actionTypes';

export const changeAppBarTitle = (title) => {
    return {type: types.APPBAR_TITLE, data: title}
};

export const changeAppBarStyle = (style) => {
    return {type: types.APPBAR_STYLE, data: style}
};

export const setAppBarSearch = (visible) => {
    return {type: types.APPBAR_SEARCH, data: visible}
};