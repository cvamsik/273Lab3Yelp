import Axios from 'axios';
import React, { Component } from 'react';
import routeConstants from '../../../Config/routeConstants';
import cookie from 'react-cookies'
import CustomerReviewCard from './CustomerReviewCard/CustomerReviewCard';
import './CustomerReviews.styles.css'
import CustomerCreateReview from './CustomerReviewCard/CustomerCreateReview'
class CustomerSelfReviews extends Component {
    state = {
        resData: []
    }


    componentDidMount = () => {
        Axios.get(`${routeConstants.BACKEND_URL}/reviews${routeConstants.GET_REVIEWS_BY_CUSTOMER}`, {
            params: {
                email_id: cookie.load('email')
            }
        }).then((res) => {
            console.log(res.data)
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
                return <CustomerReviewCard props={obj} />

            })

        }
        return (<div className="reviewList">
            <h4>Reviews</h4>
            {resList}
        </div>);
    }
}

export default CustomerSelfReviews;