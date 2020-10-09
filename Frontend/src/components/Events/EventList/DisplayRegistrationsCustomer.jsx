import Axios from 'axios';
import React, { Component } from 'react';
import routeConstants from '../../../Config/routeConstants';
import cookie from 'react-cookies'
import './EventList.styles.css'
import RegistrationCardCustomer from './EventCard/RegistrationCardCustomer';
class DisplayRegistrationsCustomer extends Component {
    state = {
        resData: []
    }


    componentDidMount = () => {
        // console.log(this.props)
        Axios.get(`${routeConstants.BACKEND_URL}/events${routeConstants.GET_REGISTRATIONS_CUSTOMER}`, {
            params: {
                email_id: cookie.load('email')
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
                return <RegistrationCardCustomer props={obj} />

            })

        }
        return (<div className="eventList">
            <h4> Current Registrations </h4>
            {resList}
        </div>);
    }
}

export default DisplayRegistrationsCustomer;