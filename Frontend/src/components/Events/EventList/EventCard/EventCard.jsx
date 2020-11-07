import React, { Component } from 'react';
import './EventCard.styles.css'
import { withRouter } from "react-router-dom";
import cookie from 'react-cookies';
import Axios from 'axios'
import routeConstants from '../../../../Config/routeConstants'
import { connect } from 'react-redux'

class EventCard extends Component {
    state = {
        redirect: false
    }

    handleClick = () => {
        // console.log(this.props);
        // localStorage.setItem('event_id', this.props.props.res.event_id)
        if (cookie.load('cookie')) {
            // console.log(this.props.props.res._id)
            Axios.defaults.headers.common['Authorization'] = this.props.jwtToken;
            Axios.post(`${routeConstants.BACKEND_URL}/events${routeConstants.POST_EVENT_REGISTRATION}`, {
                customer_id: this.props.customer_id,
                event_id: this.props.props.res._id
            }
            ).then((res) => {
                // this.setState({ resData: [...res.data] })
                // console.log(res)
                window.alert("Registered!")
            }).catch((err) => {
                window.alert("Already Registered!")
                console.log(err);

            })
        }
        else {
            window.alert("Login to Register")
            this.props.props.props.history.push('/login')
            // this.setState({ redirectA: true })
        }
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
        let Button;
        if (this.props.user_type === 1) {
            Button = <button className="btn btn-danger col-md-6" onClick={this.handleClick}>Register!</button>

        }
        return (<div>
            {/* {JSON.stringify(this.props.props)} */}
            {/* {redirectVar} */}
            <div className="restCard3">
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
                {
                    Button
                }

            </div>
        </div>);
    }
}

// export default RestaurantCard;
// export default withRouter(EventCard);

const mapStateToProps = (state) => {
    return {
        restaurant_id: state.restaurant_id,
        user_type: state.user_type,
        customer_id: state.customer_id,
        jwtToken: state.jwtToken
    };
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EventCard));