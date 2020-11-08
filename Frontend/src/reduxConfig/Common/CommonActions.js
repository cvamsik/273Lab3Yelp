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
    // console.log(payload)
    return {
        type: actionTypes.SET_ORDER_ID,
        payload: payload
    }
}
export const setConversationID = (payload) => {
    // console.log(payload)
    return {
        type: actionTypes.SET_CONVERSATION_ID,
        payload: payload
    }
}
export const setEventsList = (payload) => {
    // console.log(payload)
    return {
        type: actionTypes.SET_EVENTS_LIST,
        payload: payload
    }
}
export const setOrdersList = (payload) => {
    // console.log(payload)
    return {
        type: actionTypes.SET_ORDERS_LIST,
        payload: payload
    }
}
export const setPaginatedEventsList = (payload) => {
    // console.log(payload)
    return {
        type: actionTypes.SET_PAGINATED_EVENTS_LIST,
        payload: payload
    }
}
export const setPaginatedOrdersList = (payload) => {
    // console.log(payload)
    return {
        type: actionTypes.SET_PAGINATED_ORDERS_LIST,
        payload: payload
    }
}