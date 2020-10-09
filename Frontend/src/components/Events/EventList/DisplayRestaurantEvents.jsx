import Axios from 'axios';
import React, { Component } from 'react';
import routeConstants from '../../../Config/routeConstants';
import cookie from 'react-cookies'
import RestaurantEventCard from './EventCard/RestaurantEventCard'
class DisplayRestaurantEvents extends Component {
    state = {
        resData: []
    }


    componentDidMount = () => {
        // console.log("Orders")
        Axios.get(`${routeConstants.BACKEND_URL}/events${routeConstants.GET_EVENT_BY_RESTAURANT}`, {
            params: { email_id: cookie.load('email') }
        }
        ).then((res) => {
            this.setState({ resData: [...res.data] })
            // console.log(res)
        }).catch((err) => {
            console.log(err);
        })
    }
    render() {
        let resList = []
        if (this.state.resData.length > 0) {
            resList = this.state.resData.map((res) => {
                let obj = {
                    res: res,
                    props: this.props
                }
                return <RestaurantEventCard props={obj} />

            })

        }
        return (<div className="eventList">
            <h4>Events Created </h4>
            {resList}
        </div>);
    }
}

export default DisplayRestaurantEvents;