import Axios from 'axios';
import React, { Component } from 'react';
import routeConstants from '../../../Config/routeConstants';
import cookie from 'react-cookies'
import EventCard from './EventCard/EventCard'
import './EventList.styles.css'
class DisplayEvents extends Component {
    state = {
        resData: []
    }


    componentDidMount = () => {
        Axios.get(`${routeConstants.BACKEND_URL}/events${routeConstants.GET_ALL_EVENTS}`
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
                return <EventCard props={obj} />

            })

        }
        return (<div className="eventList">
            <h4> Current Events </h4>
            {resList}
        </div>);
    }
}

export default DisplayEvents;