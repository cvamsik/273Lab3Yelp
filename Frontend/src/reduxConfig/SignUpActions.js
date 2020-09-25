import actionTypes from './actionTypes';

export const nameHandler = (payload) => {
    // console.log("actions " + payload)

    return {
        type: actionTypes.SIGNUP_NAME,
        payload: payload
    }
}
export const emailHandler = (payload) => {
    return {
        type: actionTypes.SIGNUP_EMAIL,
        payload: payload
    }
}
export const passwordHandler = (payload) => {
    return {
        type: actionTypes.SIGNUP_PASSWORD,
        payload: payload
    }
}
export const confirmPasswordHandler = (payload) => {
    return {
        type: actionTypes.SINGUP_CONFIRM_PASSWORD,
        payload: payload
    }
}
export const aboutHandler = (payload) => {
    return {
        type: actionTypes.SIGNUP_ABOUT,
        payload: payload
    }
}
export const phoneHandler = (payload) => {
    return {
        type: actionTypes.SIGNUP_PHONE,
        payload: payload
    }
}
export const userTypeHandler = (payload) => {
    return {
        type: actionTypes.SIGNUP_USERTYPE,
        payload: payload
    }
}
export const thingsLovedHandler = (payload) => {
    return {
        type: actionTypes.SIGNUP_THINGS_LOVED,
        payload: payload
    }
}
export const findMeHandler = (payload) => {
    return {
        type: actionTypes.SIGNUP_FIND_ME,
        payload: payload
    }
}
export const blogsHandler = (payload) => {
    return {
        type: actionTypes.SIGNUP_BLOGS,
        payload: payload
    }
}
export const birthdayHandler = (payload) => {
    return {
        type: actionTypes.SIGNUP_BIRTHDAY,
        payload: payload
    }
}