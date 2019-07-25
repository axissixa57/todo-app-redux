import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { todos } from './reducers/todos';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewares = [thunkMiddleware];
// для actions 
const enhancer = composeEnhancers(applyMiddleware(...middlewares));
// если много reducers их можно скомпоновать в 1 объект {todos: ..., ...}
const rootReducer = combineReducers({ todos });
// у createStore есть метод dispatcher
const store = createStore(rootReducer, enhancer);

export default store;