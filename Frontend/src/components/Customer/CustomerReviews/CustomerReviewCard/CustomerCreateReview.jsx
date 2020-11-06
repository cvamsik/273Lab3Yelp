import React, { Component } from 'react';
import './CustomerReviewCard.styles.css'
import StarRatingComponent from 'react-star-rating-component';
import Axios from 'axios'
import cookie from 'react-cookies'
import routeConstants from '../../../../Config/routeConstants';
import { connect } from 'react-redux'

class CustomerReviewCard extends Component {
    state = {
        stars: 0,
        review_text: ""

    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.props);
        Axios.defaults.headers.common['Authorization'] = this.props.jwtToken;

        Axios.post(`${routeConstants.BACKEND_URL}/reviews${routeConstants.POST_REVIEW_CUSTOMER}`, {
            ...this.state,
            // email_id: cookie.load('email'),
            restaurant_id: this.props.restaurant_id,
            customer_id: this.props.customer_id
        }).then((res) => {
            window.alert("Review Posted")
            console.log(res)
            window.location.reload(false);
        }).catch((err) => {
            window.alert("Unable to post")
            console.log(err)

        })
    }
    onStarClick = (nextValue, prevValue, name) => {
        this.setState({ stars: nextValue }, () => {
            console.log(this.state)
        });
    }
    inputChangeHandler = (e) => {
        const { value, name } = e.target;
        this.setState({ [name]: value });
    }

    render() {


        return (<div>
            <form onSubmit={this.handleSubmit}>
                <div className="reviewCard2">
                    <h5>Post a review</h5>

                    Rating:
                    <h2><StarRatingComponent
                        name="rating"
                        starCount={5}
                        value={this.state.stars}
                        starColor="#ff1c1c"
                        onStarClick={this.onStarClick}
                    />
                    </h2>
                    <div>
                        Review:
               <textarea type='text' className="form-control" name="review_text" value={this.state.review_text} onChange={this.inputChangeHandler} />
                    </div>
                    <div>
                        <button type="submit" onClick={this.handleSubmit} className="btn btn-danger mt-3">Post Review</button>
                    </div>
                </div>
            </form>
        </div>
        );
    }
}

// export default CustomerReviewCard;

const mapStateToProps = (state) => {
    return {
        restaurant_id: state.restaurant_id,
        jwtToken: state.jwtToken
    };
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerReviewCard);