import { combineReducers } from 'redux';
import loginReducer from './LoginReducer';
import ProfileReducer from './ProfileReducer';
import SignUpReducer from './SignUpReducer';
import CartReducer from './Cart/CartReducer';

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['CartReducer', 'loginReducer']
}

const rootReducer = combineReducers({
    loginReducer,
    ProfileReducer,
    SignUpReducer,
    CartReducer
})
export default persistReducer(persistConfig, rootReducer);