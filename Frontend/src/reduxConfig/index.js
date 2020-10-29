import { combineReducers } from 'redux';
import loginReducer from './Login/LoginReducer';
import ProfileReducer from './CustomerProfile/ProfileReducer';
import SignUpReducer from './CustomerSignUp/SignUpReducer';
import CartReducer from './Cart/CartReducer';

import reduceReducers from 'reduce-reducers';

import { initialState } from './storeObject'

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'



const persistConfig = {
    key: 'root',
    storage,
    // stateReconciler: autoMergeLevel2,

}

const rootReducer = combineReducers({
    loginReducer,
    ProfileReducer,
    SignUpReducer,
    CartReducer
})


const reducer = reduceReducers(initialState,
    loginReducer,
    ProfileReducer,
    SignUpReducer,
    CartReducer
);

function combineReducers2(appState, action) {
    return {
        loginReducer: loginReducer(appState, action),
        ProfileReducer: ProfileReducer(appState, action),
        SignUpReducer: SignUpReducer(appState, action),
        CartReducer: CartReducer(appState, action),
    };
}


// const combineReducers3 = (state = initialState, action, root) => {
//     return {
//         loginReducer: loginReducer(state.loginReducer, action, state),
//         ProfileReducer: ProfileReducer(state.ProfileReducer, action, state),
//         SignUpReducer: SignUpReducer(state.SignUpReducer, action, state),
//         CartReducer: CartReducer(state.CartReducer, action, state),
//     };
// };

export default persistReducer(persistConfig, reducer);
// export default rootReducer;