import actionTypes from './actionTypes'

import { initialState } from './storeObject'

const signupReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SIGNUP_NAME:
            return {
                ...state,
                login: {
                    ...state.login,
                    name: action.payload
                }
            }
        case actionTypes.SIGNUP_EMAIL:
            return {
                ...state,
                login: {
                    ...state.login,
                    email_id: action.payload
                }
            }
        case actionTypes.SIGNUP_PASSWORD:
            return {
                ...state,
                login: {
                    ...state.login,
                    password: action.payload
                }
            }
        case actionTypes.SINGUP_CONFIRM_PASSWORD:
            return {
                ...state,
                login: {
                    ...state.login,
                    confirmPassword: action.payload
                }
            }
        case actionTypes.SIGNUP_BIRTHDAY:
            return {
                ...state,
                login: {
                    ...state.login,
                    birthday: action.payload
                }
            }
        case actionTypes.SIGNUP_ABOUT:
            return {
                ...state,
                login: {
                    ...state.login,
                    about: action.payload
                }
            }
        case actionTypes.SIGNUP_PHONE:
            return {
                ...state,
                login: {
                    ...state.login,
                    phone: action.payload
                }
            }
        case actionTypes.SIGNUP_USERTYPE:
            return {
                ...state,
                login: {
                    ...state.login,
                    userType: action.payload
                }
            }
        case actionTypes.SIGNUP_THINGS_LOVED:
            return {
                ...state,
                login: {
                    ...state.login,
                    thingsLoved: action.payload
                }
            }
        case actionTypes.SIGNUP_FIND_ME:
            return {
                ...state,
                login: {
                    ...state.login,
                    findMe: action.payload
                }
            }
        case actionTypes.SIGNUP_BLOGS:
            return {
                ...state,
                login: {
                    ...state.login,
                    blogs: action.payload
                }
            }
        default:
            return initialState;
            break;
    }
}

export default signupReducer;