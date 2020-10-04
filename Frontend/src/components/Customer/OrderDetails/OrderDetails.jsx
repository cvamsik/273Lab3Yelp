import Axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routeConstants from '../../../Config/routeConstants';

class OrderDetails extends Component {
    state = {
        resData: {

        }
    }
    componentDidMount = () => {
        Axios.get(`${routeConstants.BACKEND_URL}/orders${routeConstants.GET_ORDER_BY_ID}`, {
            params: {
                order_id: localStorage.getItem('order_id')
            }
        }).then((res) => {
            console.log(res);
            this.setState({ resData: res.data[0] })
        }).catch((err) => {
            console.log(err)
        })
    }
    render() {
        let restData = this.state.resData
        return (
            <div>
                {/* <h4>OrderDetails {localStorage.getItem('order_id')}</h4> */}
                <div className="restCard">

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
            </div>
        );
    }
}

export default OrderDetails;