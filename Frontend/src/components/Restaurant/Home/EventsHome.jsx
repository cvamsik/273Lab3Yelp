import React, { Component } from 'react';
import './RestaurantHome.styles.css'
class EventsHome extends Component {
    state = {}
    render() {
        return (
            <div className="homeLayout">
                <div className="homeGrid">
                    <a href="/restaurant/events/create" class="sq list-group-item list-group-item-danger ">Create an Event</a>
                    <a href="/restaurant/events/list" class="sq list-group-item list-group-item-danger ">List of your Events</a>
                    <a href="/restaurant/events/all" class="sq list-group-item list-group-item-danger ">All Events</a>
                    <a href="/restaurant/events/update" class="sq list-group-item list-group-item-danger ">Update an Event</a>

                </div>
            </div>
        );
    }
}

export default EventsHome;