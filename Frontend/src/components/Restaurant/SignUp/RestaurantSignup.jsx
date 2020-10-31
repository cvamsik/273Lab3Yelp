import Axios from 'axios';
import React, { Component } from 'react';
import constants from '../../../Config/routeConstants'
import CustomInput from '../../Common/CustomInput/CustomInput';
import CustomButton from '../../Common/CustomButton/CustomButton';
import { Link } from 'react-router-dom'
import { setRawCookie } from 'react-cookies';

class RestaurantSignUp extends Component {
    state = {
        restaurant_id: "",
        restaurant_name: "",
        restaurant_location: "",
        restaurant_description: "",
        restaurant_address: "",
        address_city: "",
        address_state: "",
        address_postal_code: "",
        address_latitude: "",
        address_longitude: "",
        primary_phone: "",
        secondary_phone: "",
        email: "",
        open_time: "",
        close_time: "",
        password: "",
        confirmPassword: "",
    }

    handleChange = (e) => {
        //e.preventDefault();
        const { value, name } = e.target;
        this.setState({ [name]: value });
    };
    handleSave = (e) => {
        e.preventDefault()
        const data = { ...this.state };
        Axios.post(`${constants.BACKEND_URL}/restaurant${constants.POST_RESTAURANT_SIGNUP}`, data).then((res) => {
            console.log(res);
            window.alert("Account created Successfully. Please Login");
            this.props.history.push('/login');
        }).catch((err) => {
            console.log(err);
            window.alert("Unable to create. Please Try again");
        })
    }
    render() {
        return (
            <div className="signUp">
                <h1>New Business?</h1>
                <h2>Create an account </h2>
                <h5>   and start Yelping!</h5>
                <Link to="/login" style={{ textDecoration: "none" }}>
                    Have an account? SignIn!
            </Link>

                <div className="signUpForm">
                    <form onSubmit={this.handleSave}>
                        <div className="inputs">
                            <CustomInput
                                type="text"
                                label="Restaurant Name"
                                name="restaurant_name"
                                value={this.state.restaurant_name}
                                handleChange={this.handleChange}
                                required
                            />
                            <CustomInput
                                type="text"
                                label="Restaurant Location"
                                name="restaurant_location"
                                value={this.state.restaurant_location}
                                handleChange={this.handleChange}
                                required
                            />
                            <CustomInput
                                type="text"
                                label="Restaurant Description"
                                name="restaurant_description"
                                value={this.state.restaurant_description}
                                handleChange={this.handleChange}
                                required
                            />
                            <CustomInput
                                type="text"
                                label="Restaurant Address"
                                name="restaurant_address"
                                value={this.state.restaurant_address}
                                handleChange={this.handleChange}
                                required
                            />

                            <CustomInput
                                type="text"
                                label="City"
                                name="address_city"
                                value={this.state.address_city}
                                handleChange={this.handleChange}
                                required
                            />
                            <CustomInput
                                type="text"
                                label="State"
                                name="address_state"
                                value={this.state.address_state}
                                handleChange={this.handleChange}
                                required
                            />
                            <CustomInput
                                type="text"
                                label="Postal Code"
                                name="address_postal_code"
                                value={this.state.address_postal_code}
                                handleChange={this.handleChange}
                                required
                            />
                            <CustomInput
                                type="text"
                                label="Latitude"
                                name="address_latitude"
                                value={this.state.address_latitude}
                                handleChange={this.handleChange}
                                required
                            />
                            <CustomInput
                                type="text"
                                label="Longitude"
                                name="address_longitude"
                                value={this.state.address_longitude}
                                handleChange={this.handleChange}
                                required
                            />
                            <CustomInput
                                type="text"
                                label="Primary Phone"
                                name="primary_phone"
                                value={this.state.primary_phone}
                                handleChange={this.handleChange}
                                required
                            />
                            <CustomInput
                                type="text"
                                label="Secondary Phone"
                                name="secondary_phone"
                                value={this.state.secondary_phone}
                                handleChange={this.handleChange}
                                required
                            />







                            <CustomInput
                                type="email"
                                label="Email"
                                name="email"
                                value={this.state.email}
                                handleChange={this.handleChange}
                                required
                            />
                            <CustomInput
                                type="password"
                                label="Password"
                                name="password"
                                value={this.state.password}
                                handleChange={this.handleChange}
                                required
                            />
                            <CustomInput
                                type="password"
                                label="Confirm Password"
                                name="confirmPassword"
                                value={this.state.confirmPassword}
                                handleChange={this.handleChange}
                                required
                            />
                            <CustomInput
                                type="time"
                                label="Opening Hour"
                                name="open_time"
                                value={this.state.open_time}
                                handleChange={this.handleChange}
                                required
                            />
                            <CustomInput
                                type="time"
                                label="Closing Hour"
                                name="close_time"
                                value={this.state.close_time}
                                handleChange={this.handleChange}
                                required
                            />
                        </div>
                        <CustomButton type="submit">SignUp</CustomButton>
                    </form>
                </div>
            </div>
        );
    }
}

export default RestaurantSignUp;