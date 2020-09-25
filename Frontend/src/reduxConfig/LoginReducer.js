import actionTypes from './actionTypes'

import { initialState } from './storeObject'

const loginReducer = (state = initialState, action) => {
    // console.log("In login Reducer" + JSON.stringify(action));
    switch (action.type) {
        case actionTypes.USER_LOGIN:
            console.log("logging in");
            return state;
            break;
        case actionTypes.USER_LOGOUT:
            console.log("logging out");
            return state;
            break;
        case actionTypes.LOGIN_EMAIL_HANDLER:
            return {
                ...state,
                login: {
                    ...state.login,
                    email_id: action.payload
                }
            }
        case actionTypes.LOGIN_PASSWORD_HANDLER:
            return {
                ...state,
                login: {
                    ...state.login,
                    password: action.payload
                }
            }
        case actionTypes.LOGIN_AUTHFLAG_HANDLER:
            return {
                ...state,
                login: {
                    ...state.login,
                    authFlag: action.payload
                }
            }
        default:
            return initialState;
            break;
    }
}

export default loginReducer;