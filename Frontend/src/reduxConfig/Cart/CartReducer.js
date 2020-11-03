import actionTypes from '../actionTypes'

import { initialState } from '../storeObject'


const CartReducer = (state = { ...initialState }, action) => {
    // console.log("In Cart Reducer" + JSON.stringify(action.payload));

    const addToCart = (cart, action) => {
        let cartTemp = [...cart]
        let i = 0;
        for (i = 0; i < cartTemp.length; i++) {
            if (cartTemp[i].dish_id === action.payload.dish_id) {
                cartTemp[i].count = cartTemp[i].count + 1;
                return cartTemp;
            }
        }
        cartTemp.push(action.payload)
        return cartTemp
    }

    const removeFromCart = (cart, cartTotal, action) => {
        let i = 0;
        let cartTemp = [...cart]
        for (i = 0; i < cartTemp.length; i++) {
            if (cartTemp[i].dish_id === action.payload.dish_id) {
                // console.log("--" + i);
                if (cartTemp[i].count >= 1) {
                    cartTemp[i].count = cartTemp[i].count - 1;
                    cartTotal = cartTotal - action.payload.price;
                }
                else {
                    cartTemp.splice(i, 1);
                }
            }
        }
        return {
            cart: cartTemp,
            cartTotal: cartTotal
        }

    }

    switch (action.type) {
        case actionTypes.CART_ADD_ITEM:
            {
                let temp = addToCart(state.cart, action);
                // console.log("adding item" + (state.CartReducer.cartTotal + action.payload.price));
                console.log(state);
                return Object.assign({}, state, {
                    cart: [...temp],
                    cartTotal: state.cartTotal + action.payload.price
                })
                //  {
                //     ...state,
                //     cart: [...temp]
                // }

            };

        case actionTypes.CART_REMOVE_ITEM:
            let temp2 = removeFromCart(state.cart, state.cartTotal, action);

            return {
                ...state,
                cart: [...temp2.cart],
                cartTotal: temp2.cartTotal

            };
        case actionTypes.CART_CLEAR:

            return {
                ...state,
                cart: [],
                cartTotal: 0
            };


        default:
            // console.log("Returning default")
            return state;
    }
}

export default CartReducer;