import { legacy_createStore, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import todos from '../reducers/todos';

// Используйте compose для объединения middleware и DevTools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = legacy_createStore(
    todos,
    composeEnhancers(applyMiddleware(thunk))
);

export default store;
