import Axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routeConstants from '../../../Config/routeConstants';
import './OrderDetails.styles.css';
import { connect } from 'react-redux'

class OrderDetails extends Component {
    state = {
        loaded: false
    }
    componentDidMount = () => {
        Axios.get(`${routeConstants.BACKEND_URL}/orders${routeConstants.GET_ORDER_BY_ID}`, {
            params: {
                order_id: this.props.order_id
            }
        }).then((res) => {
            console.log(res);
            // this.setState({ resData: res.data })
            this.setState({ ...res.data, loaded: true })
        }).catch((err) => {
            console.log(err)
        })
    }
    render() {
        let renderVar;
        if (this.state.loaded) {
            let restData = { ...this.state.restDetails }
            restData = { ...restData, ...this.state.orderDetails }
            renderVar = <div className="restCardOrders">

                <h4>OrderDetails {localStorage.getItem('order_id')}</h4>

                <h5>
                    Restaurant Name:{restData.restaurant_name}
                </h5>
                <h5>
                    Address:{restData.restaurant_address}
                </h5>
                <h5>
                    City:{restData.address_city}
                </h5>


                <h5>
                    Phone Numbers:{restData.primary_phone},{restData.secondary_phone}
                </h5>
                <h5>
                    Email:{restData.email}
                </h5>

                <h5>
                    Order Type:{restData.order_type}
                </h5>

                <h5>
                    Order Status:{restData.order_status}
                </h5>
                <h5>
                    Order Time: {restData.order_time}
                </h5>
                <h5>
                    Order Date:{restData.order_date}
                </h5>
                <h5>
                    Order Price:{restData.order_total_price}
                </h5>
                <h5>
                    End Digits of card used:{restData.payment_card_digits}
                </h5>
                <Link to="/customer/home"><button className="btn btn-danger">Back to Home</button></Link>

            </div>
        }
        else {
            renderVar = <h4>Unable to load</h4>
        }
        return (
            <div className="custOrderDetails">
                {renderVar}
            </div>
        );
    }
}

// export default OrderDetails;

const mapStateToProps = (state) => {
    return {
        customer_id: state.customer_id,
        order_id: state.order_id
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        // setOrderID: (order_id) => dispatch(setOrderID(order_id))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetails);