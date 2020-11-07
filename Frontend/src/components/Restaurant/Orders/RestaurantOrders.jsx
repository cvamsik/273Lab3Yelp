import Axios from 'axios';
import React, { Component } from 'react';
import routeConstants from '../../../Config/routeConstants';
// import cookie from 'react-cookies'
import RestaurantOrdersCard from './OrderCard/RestaurantOrdersCard';
import './RestaurantOrders.styles.css';
import { connect } from 'react-redux'
import { setOrderID } from '../../../reduxConfig/Common/CommonActions'

class RestaurantOrders extends Component {
    state = {
        resData: []
    }


    componentDidMount() {
        // console.log("Orders")
        Axios.defaults.headers.common['Authorization'] = this.props.jwtToken;
        Axios.get(`${routeConstants.BACKEND_URL}/orders${routeConstants.GET_ORDER_BY_RESTAURANT}`, {
            params: {
                restaurant_id: this.props.restaurant_id
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
                return <RestaurantOrdersCard props={obj} />

            })

        }
        return (<div className="ordersList">
            {resList}
        </div>);
    }
}

// export default RestaurantOrders;
const mapStateToProps = (state) => {
    return {
        customer_id: state.customer_id,
        order_id: state.order_id,
        restaurant_id: state.restaurant_id,
        jwtToken: state.jwtToken
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setOrderID: (order_id) => dispatch(setOrderID(order_id))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantOrders);