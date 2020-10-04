import actionTypes from './actionTypes'

import { initialState } from './storeObject'

const loginReducer = (state = initialState, action) => {
    console.log("In login Reducer" + JSON.stringify(action));
    switch (action.type) {
        case actionTypes.USER_LOGIN:
            console.log("logging in");
            return {
                ...state,
                loggedIn: true,
                user_email: action.payload.user_email,
                user_type: action.payload.user_type
            };
        case actionTypes.USER_LOGOUT:
            console.log("logging out");
            return {
                ...state,
                loggedIn: false,
                user_email: "",
                user_type: 0

            };
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
    }
}

export default loginReducer;