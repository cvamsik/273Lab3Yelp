import Axios from 'axios';
import React, { Component } from 'react';
import routeConstants from '../../../Config/routeConstants';
import cookie from 'react-cookies'
import RestaurantEventCard from './EventCard/RestaurantEventCard'
import { connect } from 'react-redux';
class DisplayRestaurantEvents extends Component {
    state = {
        resData: []
    }


    componentDidMount = () => {
        // console.log("Orders")
        Axios.defaults.headers.common['authorization'] = this.props.jwtToken;
        Axios.get(`${routeConstants.BACKEND_URL}/events${routeConstants.GET_EVENT_BY_RESTAURANT}`, {
            params: { restaurant_id: this.props.restaurant_id }
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

// export default DisplayRestaurantEvents;

const mapStateToProps = (state) => {
    return {
        restaurant_id: state.restaurant_id,
        jwtToken: state.jwtToken
    };
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayRestaurantEvents);