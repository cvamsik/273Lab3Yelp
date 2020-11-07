import Axios from 'axios';
import React, { Component } from 'react';
import routeConstants from '../../../Config/routeConstants';
import cookie from 'react-cookies'
import CustomerReviewCard from './CustomerReviewCard/CustomerReviewCard';
import './CustomerReviews.styles.css'
import CustomerCreateReview from './CustomerReviewCard/CustomerCreateReview'
import { connect } from 'react-redux'

class CustomerReviews extends Component {
    state = {
        resData: []
    }


    componentDidMount = () => {
        // Axios.defaults.headers.common['Authorization'] = this.props.jwtToken;
        Axios.get(`${routeConstants.BACKEND_URL}/reviews${routeConstants.GET_REVIEWS_BY_RESTAURANT}`, {
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
        console.log(this.state.resData)
        if (this.state.resData.length > 0) {
            resList = this.state.resData.map((res, i) => {
                let obj = {
                    res: res,
                    props: this.props
                }
                return <CustomerReviewCard key={i} props={obj} />

            })

        }
        return (<div className="reviewList">
            <h4>Reviews</h4>
            <CustomerCreateReview />
            {resList}
        </div>);
    }
}

// export default CustomerReviews;

const mapStateToProps = (state) => {
    return {
        restaurant_id: state.restaurant_id,
        // jwtToken: state.jwtToken
    };
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerReviews);