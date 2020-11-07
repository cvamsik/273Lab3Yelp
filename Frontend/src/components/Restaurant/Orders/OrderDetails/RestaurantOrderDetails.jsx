import Axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routeConstants from '../../../../Config/routeConstants';
import { connect } from 'react-redux'
import { setCustomerID, setConversationID } from '../../../../reduxConfig/Common/CommonActions'
class RestaurantOrderDetails extends Component {
    state = {
        resData: {

        },
        itemsArray: [],
        order_status_id: ""

    }
    inputChangeHandler = (e) => {
        const { value, name } = e.target;
        this.setState({ [name]: value });
    }
    handleSubmit = (e) => {
        // e.preventDefault();
        console.log(this.state)
        Axios.defaults.headers.common['Authorization'] = this.props.jwtToken;

        Axios.put(`${routeConstants.BACKEND_URL}/orders${routeConstants.UPDATE_ORDER}`, {
            order_status_id: this.state.order_status_id,
            order_id: this.props.order_id
        }).then((res) => {
            // console.log(res);
            window.alert("Updated Order status");
        }).catch((err) => {
            console.log(err);
            window.alert("Unable to update Status");
        })

    }
    handleContact = (e) => {
        e.preventDefault();
        // this.props.setCustomerID({ customer_id: this.state.resData.customer_id })
        // console.log(this.props)
        Axios.defaults.headers.common['Authorization'] = this.props.jwtToken;

        Axios.post(`${routeConstants.BACKEND_URL}/messages${routeConstants.POST_INITIATE_MESSAGE}`, {
            customer_id: this.props.customer_id,
            restaurant_id: this.props.restaurant_id
        }).then((res) => {
            // console.log(res.data._id)
            this.props.setConversationID({ conversation_id: res.data._id })
            this.props.history.push('/restaurant/messages/conversation')
        })


    }
    componentDidMount = () => {
        console.log(this.props)
        Axios.defaults.headers.common['Authorization'] = this.props.jwtToken;

        Axios.get(`${routeConstants.BACKEND_URL}/orders${routeConstants.GET_ORDER_BY_ID}`, {
            params: {
                order_id: this.props.order_id
            }
        }).then((res) => {

            this.setState({
                resData: { ...res.data, ...res.data.restaurant_id }, order_status_id: res.data.order_status, itemsArray: [...res.data.cart_items]
            }, () => {
                console.log(this.state.itemsArray)
                console.log(this.state)
            }
            )
        }).catch((err) => {
            console.log(err)
        })
    }
    render() {
        let restData = { ...this.state.resData }

        let items
        if (this.state.itemsArray.length > 0) {
            items = this.state.itemsArray.map((item, i) => {
                return <div key={i}>
                    <ul>
                        <lh ><h5>Dish Name: {item.dish_id.dish_name}</h5></lh>
                        <li>Dish ID: {item.dish_id._id}</li>
                        <li>Ingredients: {item.dish_id.ingredients}</li>
                        <li>Count: {item.count}</li>
                    </ul>

                </div>
            })
        }
        let renderData;
        // console.log(restData)
        if (restData) {
            if (restData.order_date) {
                restData.order_date = restData.order_date.split('T')[0]
            }
            renderData =
                <form className="restCard" onSubmit={this.handleSubmit} >
                    <h4>OrderID {this.props.order_id}</h4>
                    <h5>
                        Order Type:{restData.order_type}
                    </h5>

                    <div className="form-group col-md-8">
                        <label >Status</label>
                        <select onChange={this.inputChangeHandler} name="order_status_id" value={this.state.order_status_id} select={restData.order_status} className="form-control" >
                            <option value="Pick Up Ready">Pick Up Ready</option>
                            <option value="Picked Up">Picked Up</option>
                            <option value="On The Way">On the way</option>
                            <option value="Delivered">Delivered</option>
                            <option value="In the making">In the making</option>
                            <option value="Order Placed">Order Placed</option>
                            <option value="Cancelled">Cancelled</option>

                        </select>
                    </div>
                    <h5>
                        Order Time: {restData.order_time}
                    </h5>
                    <h5>
                        Order Date:{restData.order_date}
                    </h5>
                    <h5>
                        Order Price:{restData.order_total_price}
                    </h5>

                    <button className="btn btn-danger col-md-5" type="submit" >Update Status</button>
                </form>

        }
        return (
            <div>
                {/* <h4>OrderDetails {localStorage.getItem('order_id')}</h4> */}
                <h4>Order Details</h4>
                {renderData}
                <h4>Items in order</h4>
                <div className="restCard">
                    {items}
                    <Link to="/restaurant/orders"><button className="btn btn-danger">Back to Orders</button></Link>
                    <button className="btn btn-danger " onClick={this.handleContact} >Contact Customer</button>

                </div>
            </div>
        );
    }
}

// export default RestaurantOrderDetails;
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
        setCustomerID: (customer_id) => dispatch(setCustomerID(customer_id)),
        setConversationID: (conversation_id) => dispatch(setConversationID(conversation_id))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantOrderDetails);