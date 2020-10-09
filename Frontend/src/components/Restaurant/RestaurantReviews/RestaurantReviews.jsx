import Axios from 'axios';
import React, { Component } from 'react';
import routeConstants from '../../../Config/routeConstants';
import cookie from 'react-cookies'
import CustomerReviewCard from './CustomerReviewCard/CustomerReviewCard';
import './RestaurantReviews.styles.css'
import CustomerCreateReview from './CustomerReviewCard/CustomerCreateReview'
class RestaurantReviews extends Component {
    state = {
        resData: []
    }


    componentDidMount = () => {
        Axios.get(`${routeConstants.BACKEND_URL}/reviews${routeConstants.GET_REVIEWS_ID_RESTAURANT}`, {
            params: {
                email: cookie.load('email')
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
        return (<div className="reviewListRest">
            <h4>Reviews</h4>
            {resList}
        </div>);
    }
}

export default RestaurantReviews;