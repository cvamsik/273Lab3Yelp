import React, { Component } from 'react';
import './RestaurantHome.styles.css'
class RestaurantHome extends Component {
    state = {}
    render() {
        return (
            <div className="homeLayout">
                <div className="homeGrid">
                    <a href="/restaurant/menu" class="sq list-group-item list-group-item-danger ">Menu</a>
                    <a href="/restaurant/reviews" class="sq  list-group-item list-group-item-danger ">Reviews</a>
                    <a href="/restaurant/orders" class="sq list-group-item list-group-item-danger ">Orders</a>
                    <a href="/restaurant/events/home" class="sq list-group-item list-group-item-danger ">Events</a>
                    <a href="/restaurant/profile" class="sq list-group-item list-group-item-danger ">Profile</a>
                </div>
            </div>
        );
    }
}

export default RestaurantHome;