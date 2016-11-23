import { createStore } from 'redux';

const reducer = (state, action) => {
    switch (action.type) {
        case 'load_configurations':
            return Object.assign({}, state, {configurations: action.data});
        default:
            return state;
    }
};

const store = createStore(reducer, {});

export default store;
