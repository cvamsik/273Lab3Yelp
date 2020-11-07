import React, { Component } from 'react';
import axios from 'axios';
import constants from '../../../Config/routeConstants'
import cookie from 'react-cookies'
import RestaurantMenuCard from './RestaurantMenuCard/RestaurantMenuCard';
import './RestaurantMenu.styles.css'
import { connect } from 'react-redux'
class RestaurantMenu extends Component {
    state = {
        res: []
    }
    componentDidMount() {
        // console.log("card loaded")

        // console.log(this.props)
        axios.defaults.headers.common['Authorization'] = this.props.jwtToken;
        axios.get(`${constants.BACKEND_URL}/restaurant/${constants.GET_RESTAURANT_MENU}`, {
            params:
            {
                // email: "Gustavo_Monk@example.com"
                restaurant_id: this.props.restaurant_id
            }
        }).then((res) => {
            console.log("Test data")
            this.setState({ res: res.data });
            console.log(res);

        }).catch((err) => {
            console.log(err);
            window.alert("Failed to load menu");
        })
    }
    render() {
        let dishes
        let desserts = [];
        let salads = [];
        let beverages = [];
        let appetizers = [];
        let mains = [];
        if (this.state.res.length > 0) {
            dishes = this.state.res.map((dish) => {
                switch (dish.category_id) {
                    case 'Desserts':
                        {
                            desserts.push(<RestaurantMenuCard menuItem={dish} />)
                            break;
                        }
                    case 'Salads':
                        {
                            salads.push(<RestaurantMenuCard menuItem={dish} />)
                            break;
                        }
                    case 'Beverages':
                        {
                            beverages.push(<RestaurantMenuCard menuItem={dish} />)
                            break;
                        }
                    case 'Appetizers':
                        {
                            appetizers.push(<RestaurantMenuCard menuItem={dish} />)
                            break;
                        }
                    case 'Main Course':
                        {
                            mains.push(<RestaurantMenuCard menuItem={dish} />)
                            break;
                        }
                    default:
                        {
                            console.log("Cannot Match Category Map")
                        }
                }
            }
            )
        }
        else {
            dishes = <h3>Unable to fetch menu.</h3>
        }
        return (
            <div className="menuPage">
                <div className="menuList">
                    <div className="menuListFlex2">

                        <h5>Appetizers</h5>
                        <div className="menuList12">

                            {appetizers}
                        </div>
                        <h5>Salads</h5>
                        <div className="menuList12">


                            {salads}
                        </div>
                        <h5>Mains</h5>
                        <div className="menuList12">

                            {mains}
                        </div>
                        <h5>Desserts</h5>
                        <div className="menuList12">

                            {desserts}
                        </div>
                        <h5>Beverages</h5>
                        <div className="menuList12">

                            {beverages}
                        </div>

                    </div>
                </div>

            </div >
        );
    }
}

// export default RestaurantMenu;

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

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantMenu);