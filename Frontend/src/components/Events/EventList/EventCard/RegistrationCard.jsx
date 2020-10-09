import React, { Component } from 'react';
import './EventCard.styles.css'
import { Redirect, withRouter } from "react-router-dom";
import cookie from 'react-cookies';
import Axios from 'axios'
import routeConstants from '../../../../Config/routeConstants'

class RegistrationCard extends Component {
    state = {
        redirect: false
    }

    // handleClick = () => {
    //     console.log(this.props);
    //     // localStorage.setItem('event_id', this.props.props.res.event_id)
    //     if (cookie.load('cookie')) {
    //         // this.props.props.props.history.push({
    //         //     pathname: '/customer/event',
    //         //     state: {
    //         //         order_id: this.props.props.res.order_id
    //         //     }
    //         // })
    //         // this.setState({ redirectB: true })
    //         Axios.post(`${routeConstants.BACKEND_URL}/events${routeConstants.POST_EVENT_REGISTRATION}`, {
    //             email_id: cookie.load('email'),
    //             event_id: this.props.props.res.event_id
    //         }
    //         ).then((res) => {
    //             // this.setState({ resData: [...res.data] })
    //             console.log(res)
    //             window.alert("Registered!")
    //         }).catch((err) => {
    //             window.alert("Already Registered!")
    //             console.log(err);

    //         })
    //     }
    //     else {
    //         window.alert("Login to Register")
    //         this.props.props.props.history.push('/login')
    //         // this.setState({ redirectA: true })
    //     }
    // }
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
        return (<div>
            {/* {JSON.stringify(this.props.props)} */}
            {/* {redirectVar} */}
            <div className="restCard3">
                <div className="eventImage">
                    <img className="img-thumbnail" style={{ "marginBottom": '15px' }} src={restData.image_url} width='200px' height='150px' />
                </div>
                <h5>Name: {restData.customer_name}</h5>
                <p>Email: {restData.email_id}</p>
                <p>Contact: {restData.contact_number}</p>

                <p>Registration Date: {restData.registration_date.split('T')[0]}</p>
                <p>Registration Time: {restData.contact_number}</p>
                {/* <button className="btn btn-danger col-md-6" onClick={this.handleClick}>Register!</button> */}

            </div>
        </div>);
    }
}

// export default RestaurantCard;
export default withRouter(RegistrationCard);
