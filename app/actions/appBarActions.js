import * as types from '../constants/actionTypes';

export const changeAppBarTitle = (title) => {
    return { type: types.APPBAR_TITLE, title: title };
};

export const changeAppBarStyle = (style) => {
    return { type: types.APPBAR_STYLE, style: style };
};

export const setAppBarSearch = (visible) => {
    return { type: types.APPBAR_SEARCH, visible: visible };
};
