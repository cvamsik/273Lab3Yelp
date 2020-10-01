import actionTypes from '../actionTypes'

import { initialState } from '../storeObject'


const CartReducer = (state = initialState, action) => {
    // console.log("In Cart Reducer" + JSON.stringify(action.payload));

    const addToCart = (cart, action) => {
        let i = 0;
        for (i = 0; i < cart.length; i++) {
            if (cart[i].dish_id === action.payload.dish_id) {
                console.log("--" + i);
                cart[i].count = cart[i].count + 1;
                return cart;
            }
        }
        cart.push(action.payload)
        return cart
    }

    const removeFromCart = (cart, action) => {
        let i = 0;
        for (i = 0; i < cart.length; i++) {
            if (cart[i].dish_id === action.payload.dish_id) {
                console.log("--" + i);
                cart[i].count = cart[i].count - 1;
                return cart;
            }
        }
        return cart
    }
    switch (action.type) {
        case actionTypes.CART_ADD_ITEM:
            {
                let temp = addToCart(state.cart, action);
                // console.log("adding item" + JSON.stringify(temp));
                let temp3 = {
                    ...state,
                    cart: [...temp]

                }
                console.log(temp3)
                return temp3;

            };

        case actionTypes.CART_REMOVE_ITEM:
            let temp2 = removeFromCart(state.cart, action);
            // console.log("deleting item" + JSON.stringify(temp2));
            return {
                ...state,
                cart: [...temp2]
            };
        case actionTypes.CART_CLEAR:

            return {
                ...state,
                cart: []
            };


        default:
            return initialState;
    }
}

export default CartReducer;