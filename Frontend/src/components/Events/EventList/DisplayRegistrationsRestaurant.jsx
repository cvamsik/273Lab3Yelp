import Axios from 'axios';
import React, { Component } from 'react';
import routeConstants from '../../../Config/routeConstants';
import cookie from 'react-cookies'
import RegistrationCard from './EventCard/RegistrationCard'
import './EventList.styles.css'
class DisplayRegistrationsRestaurant extends Component {
    state = {
        resData: []
    }


    componentDidMount = () => {
        // console.log(this.props)
        Axios.get(`${routeConstants.BACKEND_URL}/events${routeConstants.GET_REGISTRATIONS_EVENT}`, {
            params: {
                event_id: this.props.history.location.state.event_id
            }

        }).then((res) => {
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
                return <RegistrationCard props={obj} />

            })

        }
        return (<div className="eventList">
            <h4> Current Registrations </h4>
            {resList}
        </div>);
    }
}

export default DisplayRegistrationsRestaurant;