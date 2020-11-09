import React, { Component } from 'react';
import './EventCard.styles.css'
import { withRouter } from "react-router-dom";
// import cookie from 'react-cookies';
// import Axios from 'axios'
// import routeConstants from '../../../../Config/routeConstants'
import ModalImage from "react-modal-image";

class EventCard extends Component {
    state = {
        redirect: false
    }

    handleClick = () => {
        this.props.history.push(
            {
                pathname: '/restaurant/events/registrations',
                state: {
                    event_id: this.props.props.res.event_id
                }
            })
    }
    render() {
        // let redirectVar;
        // if (this.state.redirectA) {
        //     redirectVar = <Redirect to='/login' />
        // }
        // else if (this.state.redirectB) {
        //     redirectVar = <Redirect to='/customer/event' />

        // }

        const restData = { ...this.props.props.res }
        // if (restData.order_date != undefined) {
        //     restData.order_date = restData.order_date.split('T')[0]
        // }
        // console.log(this.props);
        let imageList
        if (restData.event_images) {
            // console.log(restData.images.length)
            if (restData.event_images.length > 0) {
                imageList = restData.event_images.map((img, i) => {
                    img = img.split('?')[0]
                    return <ModalImage
                        small={img}
                        large={img}
                        alt="Event Image"
                        key={i}
                        hideDownload={true}
                        className="imageDisplayEvent"
                    />;
                })
            }
        }
        let renderVar = null
        if (restData) {
            renderVar = <div className="restCard3">
                <h5>{restData.restaurant_name}</h5>
                <p>{restData.restaurant_address}</p>
                <p>{restData.event_description}</p>
                <p>{restData.event_date.split('T')[0]}</p>
                <p>{restData.event_time}</p>
                <p>{restData.event_hashtags}</p>
                <div className="imageListEvents eventImages">
                    {imageList}
                </div>
                <button className="btn btn-danger col-md-6" onClick={this.handleClick}>Check Registrations</button>

            </div>
        }


        return (<div>
            {/* {JSON.stringify(this.props.props)} */}
            {/* {redirectVar} */}
            {/* <div className="restCard3">
                <div className="eventImage">
                    <img className="img-thumbnail" alt="eventImage" style={{ "marginBottom": '15px' }} src={restData.image_url} width='200px' height='150px' />
                    <h4>{restData.event_name}</h4>
                </div>
                <h5>{restData.restaurant_name}</h5>
                <p>{restData.restaurant_address}</p>
                <p>{restData.event_description}</p>
                <p>{restData.event_date.split('T')[0]}</p>
                <p>{restData.event_time}</p>
                <p>{restData.event_hashtags}</p>
                <button className="btn btn-danger col-md-6" onClick={this.handleClick}>Check Registrations</button>

            </div> */}
            {renderVar}
        </div>);
    }
}

// export default RestaurantCard;
export default withRouter(EventCard);
