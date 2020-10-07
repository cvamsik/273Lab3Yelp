import React, { Component } from 'react';
import axios from 'axios';
import constants from '../../../Config/routeConstants'
import cookie from 'react-cookies'
import MenuItem from './MenuItem/MenuItem';
import './Menu.styles.css'
import Checkout from '../../Customer/Checkout/Checkout';
import CustomerReviews from '../../Customer/CustomerReviews/CustomerReviews'
import MapDisplay from '../../Customer/MapDisplay/MapDisplay';
class Menu extends Component {
    state = {
        res: []
    }
    componentDidMount() {
        // console.log("card loaded")

        // console.log(this.props)
        axios.get(`${constants.BACKEND_URL}/restaurant/${constants.GET_RESTAURANT_MENU}`, {
            params:
                { email: this.props.location.state.restaurant_email }
        }).then((res) => {
            this.setState({ res: res.data });
            // console.log(res.data);

        }).catch((err) => {
            console.log(err);
            window.alert("Failed to load menu");
        })
    }
    render() {
        let dishes = this.state.res.map((dish) =>
            <MenuItem menuItem={dish} />
        )
        // console.log(this.props)
        return (
            <div className="menuPage">
                <h3>{localStorage.getItem('restaurant_name')}</h3>
                <h4>Menu</h4>
                <div className="menuCheckout">

                    <div className="menuList2">

                        {dishes}

                    </div>
                    <Checkout props={this.props} />
                </div>
                <MapDisplay props={this.props.location.state.res} />
                <CustomerReviews />
            </div>
        );
    }
}

export default Menu;