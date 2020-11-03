import Axios from 'axios';
import React, { Component } from 'react';
import routeConstants from '../../../Config/routeConstants';
// import cookie from 'react-cookies'
import { connect } from 'react-redux';
import { setOrderID } from '../../../reduxConfig/Common/CommonActions'

import OrderCard from './Ordercard/OrderCard'
class Orders extends Component {
    state = {
        resData: []
    }


    componentDidMount = () => {
        console.log("Orders")
        Axios.get(`${routeConstants.BACKEND_URL}/orders${routeConstants.GET_ORDER_BY_CUSTOMER}`, {
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
                return <OrderCard props={obj} />

            })

        }
        return (<div className="ordersList">
            <h4>Your Orders</h4>
            {resList}
        </div>);
    }
}

// export default Orders;

const mapStateToProps = (state) => {
    return {
        customer_id: state.customer_id,
        order_id: state.order_id
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setOrderID: (order_id) => dispatch(setOrderID(order_id))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);