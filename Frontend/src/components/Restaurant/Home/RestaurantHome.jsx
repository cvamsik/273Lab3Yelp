import React, { Component } from 'react';
import './RestaurantHome.styles.css'
class RestaurantHome extends Component {
    state = {}
    render() {
        return (
            <div className="homeLayout">
                <div className="homeGrid">
                    <div className="sq zoom">
                        <h4>Menu</h4>
                        <a href="/restaurant/menu/list" >View and Update</a>
                        <a href="/restaurant/menu/create">Add a Dish</a>
                    </div>
                    <div className="sq zoom">
                        <h4>Reviews</h4>
                        <a href="/restaurant/reviews" >View</a>
                    </div>

                    <div className="sq zoom">
                        <h4>Orders</h4>
                        <a href="/restaurant/orders" >View and Update</a>
                    </div>
                    <div className="sq zoom">
                        <h4>Events</h4>
                        <a href="/restaurant/events/create" >Create</a>
                        <a href="/restaurant/events/list" >View your Events</a>
                        <a href="/restaurant/events/all" >View all Events</a>

                    </div>

                </div>
            </div>
        );
    }
}

export default RestaurantHome;