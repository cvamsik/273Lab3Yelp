import React, { Component } from 'react';
import axios from 'axios';
import constants from '../../../Config/routeConstants'
// import cookie from 'react-cookies'
import MenuItem from './MenuItem/MenuItem';
import './Menu.styles.css'
import Checkout from '../../Customer/Checkout/Checkout';
import CustomerReviews from '../../Customer/CustomerReviews/CustomerReviews'
import MapDisplay from '../../Customer/MapDisplay/MapDisplay';
import { connect } from 'react-redux'
class Menu extends Component {
    state = {
        res: [],

    }
    componentDidMount() {
        // console.log(this.props)
        axios.defaults.headers.common['Authorization'] = this.props.jwtToken;

        axios.get(`${constants.BACKEND_URL}/restaurant/${constants.GET_RESTAURANT_MENU}`, {
            params:
                { restaurant_id: this.props.restaurant_id }
        }).then((res) => {
            this.setState({ res: res.data });
            console.log(res.data);

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
        if (this.state.res && this.state.res.length > 0) {
            this.state.res.map((dish, i) => {
                // <MenuItem menuItem={dish} />
                // console.log(dish.category_id)
                switch (dish.category_id) {
                    case "Desserts":
                        {
                            desserts.push(<MenuItem key={i} menuItem={dish} />)
                            break;
                        }
                    case "Salads":
                        {
                            salads.push(<MenuItem key={i} menuItem={dish} />)
                            break;
                        }
                    case "Beverages":
                        {
                            beverages.push(<MenuItem key={i} menuItem={dish} />)
                            break;
                        }
                    case "Appetizers":
                        {
                            appetizers.push(<MenuItem key={i} menuItem={dish} />)
                            break;
                        }
                    case "Main Course":
                        {
                            mains.push(<MenuItem key={i} menuItem={dish} />)
                            break;
                        }
                    default:
                        {
                            console.log("Category not found")
                        }
                }

            }
            )
        }
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
                <MapDisplay props={this.state.res} />
                <CustomerReviews />
            </div>
        );
    }
}

// export default Menu;

const mapStateToProps = (state) => {
    return {
        restaurant_id: state.restaurant_id,
        jwtToken: state.jwtToken
    };
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);