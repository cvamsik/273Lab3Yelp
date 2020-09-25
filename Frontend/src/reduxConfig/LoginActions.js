import actionTypes from './actionTypes';

export const login = (payload) => {
    return {
        type: actionTypes.USER_LOGIN,
        payload: payload
    }
}
export const logout = (payload) => {
    return {
        type: actionTypes.USER_LOGOUT,
        payload: payload
    }
}

export const emailHandler = (payload) => {
    return {
        type: actionTypes.LOGIN_EMAIL_HANDLER,
        payload: payload
    }
}
export const passwordHandler = (payload) => {
    return {
        type: actionTypes.LOGIN_PASSWORD_HANDLER,
        payload: payload
    }
}

export const authFlagHandler = (payload) => {
    return {
        type: actionTypes.LOGIN_AUTHFLAG_HANDLER,
        payload: payload
    }
}


// export const counterIncrement = (payload) => {
//     console.log("Counter Action called ->" + payload)
//     return {
//         type: actionTypes.COUNTER,
//         payload: payload
//     }
// }


