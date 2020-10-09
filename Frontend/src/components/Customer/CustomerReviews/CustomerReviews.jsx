import Axios from 'axios';
import React, { Component } from 'react';
import routeConstants from '../../../Config/routeConstants';
import cookie from 'react-cookies'
import CustomerReviewCard from './CustomerReviewCard/CustomerReviewCard';
import './CustomerReviews.styles.css'
import CustomerCreateReview from './CustomerReviewCard/CustomerCreateReview'
class CustomerReviews extends Component {
    state = {
        resData: []
    }


    componentDidMount = () => {
        Axios.get(`${routeConstants.BACKEND_URL}/reviews${routeConstants.GET_REVIEWS_BY_RESTAURANT}`, {
            params: {
                restaurant_id: localStorage.getItem("restaurant_id")
            }
        }).then((res) => {
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
                return <CustomerReviewCard props={obj} />

            })

        }
        return (<div className="reviewList">
            <h4>Reviews</h4>
            <CustomerCreateReview />
            {resList}
        </div>);
    }
}

export default CustomerReviews;