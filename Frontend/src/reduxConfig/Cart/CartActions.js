import actionTypes from '../actionTypes';

export const addToCart = (payload) => {
    console.log("Hitting cart actions" + JSON.stringify(payload));
    return {
        type: actionTypes.CART_ADD_ITEM,
        payload: payload
    }
}
export const removeFromCart = (payload) => {
    console.log("Hitting cart actions" + JSON.stringify(payload));

    return {
        type: actionTypes.CART_REMOVE_ITEM,
        payload: payload
    }
}


export const clearCart = (payload) => {
    console.log("Hitting cart actions" + JSON.stringify(payload));

    return {
        type: actionTypes.CART_CLEAR,
        payload: payload
    }
}
