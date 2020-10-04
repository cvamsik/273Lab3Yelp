import { createStore } from 'redux'
import { persistStore } from 'redux-persist'
import allReducers from './index'

const store = createStore(allReducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const persistor = persistStore(store);

export default { store, persistor };

// import logger from 'redux-logger';
// const middlewares = [logger];

// const store = createStore(allReducers,
//     applyMiddleware(...middlewares)
// );

// const persistor = persistStore(store);

// export default { store, persistor };