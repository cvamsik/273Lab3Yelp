import Axios from 'axios';
import React, { Component } from 'react';
import routeConstants from '../../../Config/routeConstants';
// import cookie from 'react-cookies'
import { connect } from 'react-redux';
import { setOrderID, setOrdersList, setPaginatedOrders } from '../../../reduxConfig/Common/CommonActions'
import ReactPaginate from 'react-paginate';
import OrderCard from './Ordercard/OrderCard'
class Orders extends Component {
    state = {
        resData: [],
        offset: 0,
        data: [],
        perPage: 5,
        currentPage: 0,
        displayList: []
    }


    componentDidMount = () => {
        console.log("Orders")
        Axios.defaults.headers.common['Authorization'] = this.props.jwtToken;

        Axios.get(`${routeConstants.BACKEND_URL}/orders${routeConstants.GET_ORDER_BY_CUSTOMER}`, {
            params: {
                customer_id: this.props.customer_id
            }
        }).then((res) => {
            // this.setState({ resData: [...res.data] })
            this.props.setOrdersList({
                ordersList: [...res.data]
            })
            console.log(res)
        })
            .then(() => this.receivedData())
            .catch((err) => {
                console.log(err);
            })
    }



    receivedData = () => {
        // console.log("hitting pagination")
        const slice = this.props.ordersList.slice(this.state.offset, this.state.offset + this.state.perPage);
        let dList = slice.map(
            (res) => {

                return {
                    res: res,
                    props: this.props
                }
            }
        )
        // console.log(dList)
        this.props.setPaginatedOrders({ paginatedOrders: [...dList] });
        this.setState({
            pageCount: Math.ceil(this.props.ordersList.length / this.state.perPage)
        });

    }
    handlePageClick = (e) => {

        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;
        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.receivedData();
        });

    };

    render() {
        // let resList = []
        // if (this.state.resData.length > 0) {
        //     resList = this.state.resData.map((res) => {
        //         let obj = {
        //             res: res,
        //             props: this.props
        //         }
        //         return <OrderCard props={obj} />

        //     })

        // }
        return (<div className="ordersList">
            <h4>Your Orders</h4>
            {/* {resList} */}
            {this.props.paginatedOrders.map((res, key) => {
                return <OrderCard key={key} props={res} />
            })}

            <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={this.state.pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={this.handlePageClick}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"} />
        </div>);
    }
}

// export default Orders;

const mapStateToProps = (state) => {
    return {
        customer_id: state.customer_id,
        order_id: state.order_id,
        jwtToken: state.jwtToken,
        ordersList: state.ordersList,
        paginatedOrders: state.paginatedOrders
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setOrderID: (order_id) => dispatch(setOrderID(order_id)),
        setOrdersList: (ordersList) => dispatch(setOrdersList(ordersList)),
        setPaginatedOrders: (paginatedOrders) => dispatch(setPaginatedOrders(paginatedOrders))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);