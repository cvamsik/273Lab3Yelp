import actionTypes from '../actionTypes';

export const setCustomerID = (payload) => {
    return {
        type: actionTypes.SET_CUSTOMER_ID,
        payload: payload
    }
}
export const setRestaurantID = (payload) => {
    return {
        type: actionTypes.SET_RESTAURANT_ID,
        payload: payload
    }
}
export const setSearchString = (payload) => {
    return {
        type: actionTypes.SET_SEARCH_STRING,
        payload: payload
    }
}
export const setOrderID = (payload) => {
    console.log(payload)
    return {
        type: actionTypes.SET_ORDER_ID,
        payload: payload
    }
}