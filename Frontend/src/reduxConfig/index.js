import { combineReducers } from 'redux';
import loginReducer from './LoginReducer';
import ProfileReducer from './ProfileReducer';
import SignUpReducer from './SignUpReducer';
import CartReducer from './Cart/CartReducer';

const allReducers = combineReducers({
    loginReducer,
    ProfileReducer,
    SignUpReducer,
    CartReducer
})
export default allReducers;