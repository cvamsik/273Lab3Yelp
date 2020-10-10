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
        let desserts = [];
        let salads = [];
        let beverages = [];
        let appetizers = [];
        let mains = [];
        let dishes = this.state.res.map((dish) => {
            // <MenuItem menuItem={dish} />
            // console.log(dish.category_id)
            switch (dish.category_id) {
                case 1:
                    {
                        desserts.push(<MenuItem menuItem={dish} />)
                        break;
                    }
                case 2:
                    {
                        salads.push(<MenuItem menuItem={dish} />)
                        break;
                    }
                case 3:
                    {
                        beverages.push(<MenuItem menuItem={dish} />)
                        break;
                    }
                case 4:
                    {
                        appetizers.push(<MenuItem menuItem={dish} />)
                        break;
                    }
                case 5:
                    {
                        mains.push(<MenuItem menuItem={dish} />)
                        break;
                    }
                default:
                    {

                    }
            }
        }
        )
        // console.log(this.props)
        return (
            <div className="menuPage1">
                <h3>{localStorage.getItem('restaurant_name')}</h3>
                <h4>Menu</h4>
                <div className="menuCheckout1">

                    <div className="menuListFlex">

                        {/* {dishes} */}
                        <h5>Appetizers</h5>
                        <div className="menuList11">

                            {appetizers}
                        </div>
                        <h5>Salads</h5>
                        <div className="menuList11">


                            {salads}
                        </div>
                        <h5>Mains</h5>
                        <div className="menuList11">

                            {mains}
                        </div>
                        <h5>Desserts</h5>
                        <div className="menuList11">

                            {desserts}
                        </div>
                        <h5>Beverages</h5>
                        <div className="menuList11">

                            {beverages}
                        </div>

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