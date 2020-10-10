import Axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routeConstants from '../../../../Config/routeConstants';

class RestaurantOrderDetails extends Component {
    state = {
        resData: {

        },
        itemsArray: [],
        order_status_id: 0

    }
    inputChangeHandler = (e) => {
        const { value, name } = e.target;
        this.setState({ [name]: value });
    }
    handleSubmit = (e) => {
        // e.preventDefault();
        console.log(this.state)
        Axios.put(`${routeConstants.BACKEND_URL}/orders${routeConstants.UPDATE_ORDER}`, {
            order_status_id: this.state.order_status_id,
            order_id: localStorage.getItem('order_id')
        }).then((res) => {
            // console.log(res);
            window.alert("Updated Order status");
        }).catch((err) => {
            console.log(err);
            window.alert("Unable to update Status");
        })

    }
    componentDidMount = () => {

        Axios.get(`${routeConstants.BACKEND_URL}/orders${routeConstants.GET_ORDER_BY_ID}`, {
            params: {
                order_id: localStorage.getItem('order_id')
            }
        }).then((res) => {
            console.log();

            this.setState({
                resData: { ...res.data.resArray[0][0] },
                itemsArray: res.data.itemsArray[0],
                order_status_id: res.data.resArray[0][0].order_status_id
            }, () => console.log((this.state)))
        }).catch((err) => {
            console.log(err)
        })
    }
    render() {
        let restData = { ...this.state.resData }
        // console.log(restData)
        if (restData) {
            restData.order_date = restData.order_date.split('T')[0]
        }


        let items = this.state.itemsArray.map((item) => {
            return <div>
                <ul>
                    <lh><h5>Dish Name: {item.dish_name}</h5></lh>
                    <li>Dish ID: {item.dish_id}</li>

                    <li>Count: {item.count}</li>
                </ul>

            </div>
        })
        let renderData;
        if (restData) {
            renderData =
                <form className="restCard" onSubmit={this.handleSubmit} >
                    <h4>OrderID {localStorage.getItem('order_id')}</h4>
                    <h5>
                        Order Type:{restData.order_type}
                    </h5>

                    <div class="form-group col-md-8">
                        <label >Status</label>
                        <select onChange={this.inputChangeHandler} name="order_status_id" value={this.state.order_status_id} placeholder={this.state.order_status_id} class="form-control" >
                            <option value="1">Pick Up Ready</option>
                            <option value="2">Picked Up</option>
                            <option value="3">On the way</option>
                            <option value="4">Delivered</option>
                            <option value="5">In the making</option>
                            <option value="6">Order Placed</option>
                            <option value="7">Cancelled</option>

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

                </div>
            </div>
        );
    }
}

export default RestaurantOrderDetails;