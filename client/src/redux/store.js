import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import initialState from './initialState';
import usersReducer from './usersRedux';
import productsReducer from './productsRedux';

// combine reducers
const subreducers = {
  products: productsReducer,
  user: usersReducer,
};

const reducer = combineReducers(subreducers);

const store = createStore(
  reducer,
  initialState,
  compose(
		applyMiddleware(thunk),
		window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
	)
);

export default store;
