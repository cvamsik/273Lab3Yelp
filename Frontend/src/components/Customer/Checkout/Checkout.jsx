import React, { Component } from 'react';
// import store from '../../../reduxConfig/store';
import { addToCart, removeFromCart, clearCart } from '../../../reduxConfig/Cart/CartActions'
import { connect } from 'react-redux';
import EnhancedTable from './Table/Table'
import { setOrderType } from '../../../reduxConfig/Common/CommonActions'

// import { useHistory } from "react-router-dom";


class CheckOut extends Component {

    // state = {
    //     rows: this.props.cart,
    //     add: this.props.addToCart,
    //     remove: this.props.removeFromCart
    // }
    componentDidMount = () => {
        localStorage.removeItem('order_type')
    }
    handleSubmit = (e) => {
        // const hist = useHistory();
        if (this.props.cart.cart.length > 0) {
            if (this.props.cart.order_type == null) {
                window.alert("Select order Type")
            }
            else {
                // console.log(localStorage.getItem('order_type'))
                this.props.props.history.push('/customer/payment')
            }
        }
        else {
            window.alert("Cart is empty")
        }
        //console.log(this.props.props)
    }

    handleSelectChange = (m) => {
        const { value, name } = m.target;
        localStorage.setItem('order_type', value)
        this.props.setOrderType({
            order_type: value
        })

        this.setState({ [name]: value });
    };
    render() {
        const props = {
            rows: this.props.cart,
            add: this.props.addToCart,
            remove: this.props.removeFromCart
        }

        // console.log(this.props.cart)

        return (<div >
            {/* {JSON.stringify(this.props.cart)}
            <button onClick={() => this.props.addToCart(dish_dispatch)} >Increment</button> */}
            <EnhancedTable props={props} />
            <select className="form-control"
                // value={this.state.order_type}
                onChange={this.handleSelectChange}
                required
            >

                <option defaultValue>Delivery or Pickup</option>
                <option value="Delivery">Delivery</option>
                <option value="Pickup">Pickup</option>
            </select>
            <h4>Total:{this.props.cart.cartTotal}$</h4>
            {/* <button type='submit' onClick={this.handleSubmit}>CheckOut</button> */}
            <button className="btn btn-danger" onClick={this.handleSubmit}>Checkout</button>
        </div>);
    }
}
const mapStateToProps = (state) => {
    return {
        cart: state
    }
}


const mapDispatchToProps = (dispatch) => {
    return {

        addToCart: (dish) => dispatch(addToCart(dish)),
        removeFromCart: (dish) => dispatch(removeFromCart(dish)),
        clearCart: (temp) => dispatch(clearCart(temp)),
        setOrderType: (temp) => dispatch(setOrderType(temp))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckOut);