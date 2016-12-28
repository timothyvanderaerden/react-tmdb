import * as types from '../constants/actionTypes';

export const setRouterLocation = (location) => {
    return {type: types.ROUTER_LISTEN, data: location}
};
