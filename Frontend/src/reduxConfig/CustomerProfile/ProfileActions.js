import actionTypes from '../actionTypes';

export const oldDetailsHandler = (payload) => {
    return {
        type: actionTypes.PROFILE_UPDATE_OLD_DETAILS,
        payload: payload
    }
}

export const loadDetailsHandler = (payload) => {
    console.log("load details" + JSON.stringify(payload))
    return {
        type: actionTypes.PROFILE_LOAD_DETAILS,
        payload: payload
    }
}

export const editStateHandler = (payload) => {

    return {
        type: actionTypes.PROFILE_EDIT_STATE,
        payload: payload
    }
}

export const cancelEditHandler = (payload) => {
    return {
        type: actionTypes.PROFILE_CANCEL_EDIT,
        payload: payload
    }
}