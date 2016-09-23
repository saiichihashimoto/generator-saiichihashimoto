import thunkMiddlware from 'redux-thunk';
import { applyMiddleware, combineReducers, createStore } from 'redux';

import entitiesReducer from '../entities/reducer';

let createMyStore = createStore;

if (global.window && global.window.devToolsExtension) {
	createMyStore = global.window.devToolsExtension()(createMyStore);
}
createMyStore = applyMiddleware(thunkMiddlware)(createMyStore);

export default function(initialState) {
	return createMyStore(
		combineReducers({
			entities: entitiesReducer,
		}),
		initialState
	);
}
