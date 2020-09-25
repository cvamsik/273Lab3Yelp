import { combineReducers } from 'redux';
import loginReducer from './LoginReducer';
import ProfileReducer from './ProfileReducer';
import SignUpReducer from './SignUpReducer';

const allReducers = combineReducers({
    loginReducer,
    ProfileReducer,
    SignUpReducer
})


export default allReducers;