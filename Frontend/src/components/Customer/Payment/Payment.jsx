import React from "react";

// import "./membership.styles.css";
import TextField from "@material-ui/core/TextField";
import "./Payment.styles.css";
import { Component } from "react";
import CustomButton from "../../Common/CustomButton/CustomButton";
import axios from "axios";
import RouteConstants from "../../../Config/routeConstants";
import { Link } from "react-router-dom";
import { Grid } from "@material-ui/core";
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from 'react-redux';
import cookie from 'react-cookies'
import { clearCart } from '../../../reduxConfig/Cart/CartActions'


class Payment extends Component {
    state = {
        cardno: "",
        nameoncard: "",
        cardtype: "",
        expirymonth: "",
        expiryyear: "",
        cvv: "",

        delivery_address: "",
        address_city: "",
        address_state: "",
        address_postal_code: "",
        address_latitude: 0,
        address_longitude: 0,
        primary_phone: 0,
    };


    handleChange = (m) => {
        const { value, name } = m.target;
        this.setState({ [name]: value });
    };


    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.props);
        const postObj = {
            delivery_address: this.state.delivery_address,
            address_city: this.state.address_city,
            address_state: this.state.address_state,
            address_postal_code: this.state.address_postal_code,
            address_latitude: this.state.address_latitude,
            address_longitude: this.state.address_longitude,
            primary_phone: this.state.primary_phone,
            payment_card_digits: this.state.cardno.slice(this.state.cardno.length - 4, this.state.cardno.length),
            cart_items: this.props.cart.cart,
            customer_email: cookie.load('email'),
            restaurant_id: localStorage.getItem("restaurant_id"),
            order_type: localStorage.getItem("order_type"),
            order_status: 6,
            order_total_price: this.props.cart.cartTotal,


        }
        // console.log(postObj)
        axios.post(`${RouteConstants.BACKEND_URL}/orders${RouteConstants.POST_ORDER}`, postObj).then((res) => {
            window.alert("Order Placed successfully");
            this.props.clearCart();
            this.props.history.push('/customer/orders');

        }).catch((err) => {
            console.log(err);
            window.alert("Order Unsuccessful")
        })

    };


    render() {
        const currencies = [
            {
                value: 'Visa',
                label: 'Visa',
            },
            {
                value: 'MasterCard',
                label: 'MasterCard',
            },
            {
                value: 'AmEx',
                label: 'AmEx',
            },

        ];
        let add = ""
        if (localStorage.getItem('order_type') === "2") {
            add = <div>
                <h4 className="display-4"> Delivery Address</h4>

                <div className="option">
                    <TextField
                        id="outlined-textarea"
                        label="Address"
                        placeholder="Please enter here"
                        multiline
                        variant="outlined"
                        onChange={this.handleChange}
                        required
                        fullWidth
                        name="delivery_address"
                    />
                </div>
                <div className="option">
                    <TextField
                        id="outlined-textarea"
                        label="City"
                        placeholder="Please enter here"
                        multiline
                        variant="outlined"
                        onChange={this.handleChange}
                        required
                        fullWidth
                        name="address_city"
                        style={{ paddingRight: "5px" }}
                    />
                    <TextField
                        id="outlined-textarea"
                        label="Postal Code"
                        placeholder="Please enter here"
                        multiline
                        variant="outlined"
                        onChange={this.handleChange}
                        required
                        fullWidth
                        name="address_postal_code"
                        style={{ paddingLeft: "5px", paddingRight: "5px" }}

                    />
                    <TextField
                        id="outlined-textarea"
                        label="Phone"
                        placeholder="Please enter here"
                        multiline
                        variant="outlined"
                        onChange={this.handleChange}
                        required
                        fullWidth
                        name="primary_phone"
                        style={{ paddingLeft: "5px" }}
                    />
                </div>
                <div className="option">
                    <TextField
                        id="outlined-textarea"
                        label="Latitude"
                        placeholder="Please enter here"
                        multiline
                        variant="outlined"
                        onChange={this.handleChange}
                        required
                        fullWidth
                        name="address_latitude"
                        style={{ paddingRight: "5px" }}
                    />
                    <TextField
                        id="outlined-textarea"
                        label="Longitude"
                        placeholder="Please enter here"
                        multiline
                        variant="outlined"
                        onChange={this.handleChange}
                        required
                        fullWidth
                        name="address_longitude"
                        style={{ paddingLeft: "5px" }}
                    />
                </div>
            </div>
        }

        return (
            <div>
                {add}
                <h5>Total Cart Value: {this.props.cart.cartTotal}</h5>
                <h5>Make payment</h5>
                <div >
                    <form onSubmit={this.handleSubmit}>

                        <div className="checkOutForm">


                            <h4 className="display-4"> Card Details</h4>
                            <div className="option">
                                <TextField
                                    id="outlined-textarea"
                                    label="Card Number"
                                    placeholder="Please enter here"
                                    multiline
                                    variant="outlined"
                                    onChange={this.handleChange}
                                    required
                                    fullWidth
                                    name="cardno"
                                />
                            </div>
                            <div className="option">
                                <TextField
                                    id="outlined-textarea"
                                    label="Name on Card"
                                    placeholder="Please enter here"
                                    multiline
                                    variant="outlined"
                                    onChange={this.handleChange}
                                    required
                                    fullWidth
                                    name="nameoncard"
                                />
                            </div>

                            <div className="option">
                                <TextField

                                    id="outlined-textarea" select
                                    label="Card Type"
                                    onChange={this.handleChange}

                                    variant="outlined"
                                    fullWidth
                                    name="cardtype"
                                >
                                    {currencies.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>
                            <div className="option">
                                <TextField
                                    id="outlined-textarea"
                                    label="Expiry Month"
                                    placeholder="Please enter here"
                                    multiline
                                    variant="outlined"
                                    onChange={this.handleChange}
                                    required
                                    name="expirymonth"
                                />

                                <TextField
                                    id="outlined-textarea"
                                    label="Expiry Year"
                                    placeholder="Please enter here"
                                    multiline
                                    variant="outlined"
                                    onChange={this.handleChange}
                                    required
                                    name="expiryyear"
                                />
                                <TextField
                                    id="outlined-textarea"
                                    label="CVV"
                                    placeholder="Please enter here"
                                    multiline
                                    variant="outlined"
                                    onChange={this.handleChange}
                                    required
                                    name="cvv"
                                />
                            </div>
                            {/* </div> */}
                        </div>
                        {/* <Link to="/memsuccess">
             <CustomButton type="submit">Start Memebership</CustomButton> 
             </Link> */}
                        <CustomButton type="submit">Pay Now!</CustomButton>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        cart: state.CartReducer
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        clearCart: () => dispatch(clearCart())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
