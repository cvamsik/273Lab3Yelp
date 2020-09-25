import { combineReducers } from 'redux';
import loginReducer from './LoginReducer';
import ProfileReducer from './ProfileReducer';

const allReducers = combineReducers({
    loginReducer,
    ProfileReducer
})


export default allReducers;