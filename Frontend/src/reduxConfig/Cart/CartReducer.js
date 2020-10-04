import actionTypes from '../actionTypes'

import { initialState } from '../storeObject'


const CartReducer = (state = initialState, action) => {
    // console.log("In Cart Reducer" + JSON.stringify(action.payload));

    const addToCart = (cart, action) => {
        let i = 0;
        for (i = 0; i < cart.length; i++) {
            if (cart[i].dish_id === action.payload.dish_id) {
                //console.log("--" + i);
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
                // console.log("--" + i);
                if (cart[i].count > 1) {
                    cart[i].count = cart[i].count - 1;
                    return cart;
                }
                else {
                    cart.splice(i, 1);
                    return cart;
                }
            }
        }
        return cart
    }

    switch (action.type) {
        case actionTypes.CART_ADD_ITEM:
            {
                let temp = addToCart(state.cart, action);
                console.log("adding item" + (state.cartTotal + action.payload.price));

                return {
                    ...state,
                    cart: [...temp],
                    cartTotal: state.cartTotal + action.payload.price
                }

            };

        case actionTypes.CART_REMOVE_ITEM:
            let temp2 = removeFromCart(state.cart, action);
            // console.log("deleting item" + JSON.stringify(temp2));
            let deduction = 0;
            if (state.cartTotal > 0) {
                deduction = action.payload.price;
            }
            // console.log(deduction + "--->" + state.cartTotal)
            return {
                ...state,
                cart: [...temp2],
                cartTotal: (state.cartTotal - deduction)

            };
        case actionTypes.CART_CLEAR:

            return {
                ...state,
                cart: [],
                cartTotal: 0
            };


        default:
            return initialState;
    }
}

export default CartReducer;