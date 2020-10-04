import React, { Component } from 'react';
import './RestaurantCard.styles.css'
import { Link } from "react-router-dom";
import Menu from '../../../Restaurant/Menu/Menu';
import { withRouter } from "react-router-dom";

import { Redirect } from "react-router-dom";

class RestaurantCard extends Component {
    state = {
        redirect: null
    }

    handleClick = () => {
        // console.log(this.props);
        localStorage.setItem('restaurant_id', this.props.props.res.restaurant_id)
        this.props.history.push({
            pathname: 'restaurant/menu',
            state: {
                restaurant_email: this.props.props.res.email,
                restaurant_id: this.props.props.res.restaurant_id
            }
        })
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to={
                {
                    pathname: 'menu',
                    state: {
                        restaurant_email: this.props.props.res.email,
                        restaurant_id: this.props.props.res.restaurant_id
                    }
                }} />
        }
        const restData = { ...this.props.props.res }

        return (<div>
            {/* {JSON.stringify(this.props.props)} */}
            <div className="restCard">
                <img className="restImage" src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?webp=true&quality=90&resize=620%2C563 "
                    alt="Rest Image"
                />
                <h3>
                    {restData.restaurant_name}
                </h3>
                <h5>
                    {restData.restaurant_description}
                </h5>
                <h5>
                    Location: {restData.restaurant_location}
                </h5>
                <h5>
                    Address:{restData.restaurant_address}
                </h5>
                <h5>
                    City:{restData.address_city}
                </h5>
                <h5>
                    State:{restData.address_state}
                </h5>
                <h5>
                    Postal Code:{restData.address_postal_code}
                </h5>
                <h5>
                    Phone Numbers:{restData.primary_phone},{restData.secondary_phone}
                </h5>
                <h5>
                    Email:{restData.email}
                </h5>
                <h5>
                    Timings :{restData.open_time} to {restData.close_time}
                </h5>
                <h5>
                    Average Rating:{restData.stars_avg}
                </h5>
                <h5>
                    Open Now? : {restData.is_open}
                </h5>
                {/* <Link to={{
                    pathname: 'menu',
                    state: {
                        restaurant_email: this.props.props.res.email,
                        restaurant_id: this.props.props.res.restaurant_id
                    }
                }} component={Menu}><button >Check the Menu</button></Link> */}
                <button onClick={this.handleClick}>Check the Menu</button>
            </div>
        </div>);
    }
}

// export default RestaurantCard;
export default withRouter(RestaurantCard);
