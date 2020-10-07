import React, { Component } from 'react';
import axios from 'axios';
import constants from '../../../Config/routeConstants'
import cookie from 'react-cookies'
import RestaurantMenuCard from './RestaurantMenuCard/RestaurantMenuCard';
import './RestaurantMenu.styles.css'

class RestaurantMenu extends Component {
    state = {
        res: []
    }
    componentDidMount() {
        // console.log("card loaded")

        // console.log(this.props)
        axios.get(`${constants.BACKEND_URL}/restaurant/${constants.GET_RESTAURANT_MENU}`, {
            params:
            {
                // email: "Gustavo_Monk@example.com"
                email: this.props.location.state.restaurant_email
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
        if (this.state.res.length > 0) {
            // console.log(this.state)
            dishes = this.state.res.map((dish) =>
                // console.log(dish)
                <RestaurantMenuCard menuItem={dish} />
            )
        }
        else {
            dishes = <h3>Unable to fetch menu.</h3>
        }
        return (
            <div className="menuPage">
                <div className="menuList">
                    {dishes}

                </div>

            </div>
        );
    }
}

export default RestaurantMenu;