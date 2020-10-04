import Axios from 'axios';
import React, { Component } from 'react';
import routeConstants from '../../../Config/routeConstants'
import RestaurantCard from './RestaurantCard/RestaurantCard';

class RestaurantList extends Component {
    state = {
        resData: []

    }
    componentDidMount = () => {
        Axios.get(`${routeConstants.BACKEND_URL}/restaurant${routeConstants.GET_ALL_RESTAURANTS}`).then((res) => {
            console.log(res.data[0]);
            this.setState({ resData: [...res.data] })
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
                return <RestaurantCard props={obj} />

            })

        }
        return (<div>
            {/* <RestaurantCard props={this.state.resData[0]} /> */}
            {resList}
        </div>);
    }
}

export default RestaurantList;