import { createStore } from 'redux';

const reducer = (state, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

const store = createStore(reducer, {});

export default store;
