import React, { Component } from 'react';
import './RestaurantCard.styles.css'
import { Link } from "react-router-dom";
import Menu from '../../../Restaurant/Menu/Menu';
import { withRouter } from "react-router-dom";
import './RestaurantCard.styles.css'
import { Redirect } from "react-router-dom";

class RestaurantCard extends Component {
    state = {
        redirect: null
    }

    handleClick = () => {
        // console.log(this.props);
        localStorage.setItem('restaurant_id', this.props.props.res.restaurant_id)
        localStorage.setItem('restaurant_name', this.props.props.res.restaurant_name)
        localStorage.setItem('latitude', this.props.props.res.address_latitude)
        localStorage.setItem('longitude', this.props.props.res.address_longitude)

        this.props.history.push({
            pathname: 'restaurant/menu',
            state: {
                restaurant_email: this.props.props.res.email,
                restaurant_id: this.props.props.res.restaurant_id,
                res: this.props.props.res
            }
        })
    }
    render() {
        // console.log(this.props)
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
            <div className="restaurantCard">
                <div className="flexCont">
                    <img className="restImage" src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?webp=true&quality=90&resize=620%2C563 "
                        alt="Rest Image"
                    />
                    <h3 >
                        {restData.restaurant_name}
                    </h3>
                    <h6 >
                        {restData.restaurant_description}
                    </h6>
                    <h6 >
                        <b> Location:</b> {restData.restaurant_location}
                    </h6>
                    <h6 >
                        <b> Timings:</b>{restData.open_time} to {restData.close_time}
                    </h6>
                    <h6 >
                        <b> Average Rating:</b>{restData.stars_avg}
                    </h6>
                    <h6 >
                        <b> Open Now?:</b> {restData.is_open ? "Yes" : "No"}
                    </h6>
                </div>
                <div className="flexCont">
                    <h6 >
                        <b>Address:</b>{restData.restaurant_address}
                    </h6>
                    <h6 >
                        <b>City:</b>{restData.address_city}
                    </h6>
                    <h6 >
                        <b> State:</b>{restData.address_state}
                    </h6>
                    <h6 >
                        <b> Postal Code:</b>{restData.address_postal_code}
                    </h6>
                    <h6 >
                        <b> Phone Numbers:</b>{restData.primary_phone},{restData.secondary_phone}
                    </h6>
                    <h6 >
                        <b> Email:</b>{restData.email}
                    </h6>

                    {/* <Link to={{
                    pathname: 'menu',
                    state: {
                        restaurant_email: this.props.props.res.email,
                        restaurant_id: this.props.props.res.restaurant_id
                    }
                }} component={Menu}><button >Check the Menu</button></Link> */}
                    <button onClick={this.handleClick} className=" btn btn-danger">Check it out!</button>
                </div>
            </div>
        </div>);
    }
}

// export default RestaurantCard;
export default withRouter(RestaurantCard);
