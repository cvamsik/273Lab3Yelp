import React, { Component } from 'react';
import store from '../../../reduxConfig/store';
import { addToCart, removeFromCart, clearCart } from '../../../reduxConfig/Cart/CartActions'
import { connect } from 'react-redux';

class CheckOut extends Component {

    render() {
        console.log(this.props)
        return (<div>
            {JSON.stringify(this.props)}
        </div>);
    }
}
const mapStateToProps = (state) => {
    console.log(state);
    return {
        cart: [...state.CartReducer.cart]
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        // counterIncrement: (counter) => dispatch(counterIncrement(counter))
        // emailHandler: (email_id) => dispatch(emailHandler(email_id)),
        // passwordHandler: (password) => dispatch(passwordHandler(password)),
        // authFlagHandler: (authFlag) => dispatch(authFlagHandler(authFlag)),
        // login: (loggedIn) => dispatch(login(loggedIn))
        addToCart: (dish) => dispatch(addToCart(dish)),
        removeFromCart: (dish) => dispatch(removeFromCart(dish)),
        clearCart: () => dispatch(clearCart())

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckOut);