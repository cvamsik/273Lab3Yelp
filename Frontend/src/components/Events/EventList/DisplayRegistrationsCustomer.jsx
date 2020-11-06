import Axios from 'axios';
import React, { Component } from 'react';
import routeConstants from '../../../Config/routeConstants';
// import cookie from 'react-cookies'
import './EventList.styles.css'
import RegistrationCardCustomer from './EventCard/RegistrationCardCustomer';
import { connect } from 'react-redux'

class DisplayRegistrationsCustomer extends Component {
    state = {
        resData: []
    }


    componentDidMount = () => {
        console.log(this.props)
        Axios.defaults.headers.common['Authorization'] = this.props.jwtToken;
        Axios.get(`${routeConstants.BACKEND_URL}/events${routeConstants.GET_REGISTRATIONS_CUSTOMER}`, {
            params: {
                customer_id: this.props.customer_id
            }

        }).then((res) => {
            this.setState({ resData: [...res.data] })
            console.log(res)
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

// export default DisplayRegistrationsCustomer;

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

export default connect(mapStateToProps, mapDispatchToProps)(DisplayRegistrationsCustomer);