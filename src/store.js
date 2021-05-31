import { createStore, applyMiddleware, compose } from 'redux';
// import { persistStore, persistReducer } from 'module';
// import storage from "redux-persist/lib/storage";
import rootReducer from './reducers/rootReducer';
import thunk from 'redux-thunk';
//
// const persistConfig = {
//   key: 'root',
//   storage
// }

// const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = [thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middleware)));

// export let store = createStore(persistedReducer, composeEnhancers(applyMiddleware(...middleware)));
// export let persistor = persistStore(store);

export default store;
