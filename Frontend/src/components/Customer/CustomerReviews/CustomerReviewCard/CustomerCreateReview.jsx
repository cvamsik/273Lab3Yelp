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
        review_text: "",

        selectedFile: null
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



    onChangeHandler = event => {
        this.setState({
            selectedFile: event.target.files,
        })
    }
    onClickHandler = (e) => {
        e.preventDefault()
        const data = new FormData()
        for (let x = 0; x < this.state.selectedFile.length; x++) {
            data.append('file', this.state.selectedFile[x])
        }
        data.append('stars', this.state.stars)
        data.append('review_text', this.state.review_text)
        data.append('customer_id', this.props.customer_id)
        data.append('restaurant_id', this.props.restaurant_id)
        Axios.post(`${routeConstants.BACKEND_URL}/images${routeConstants.POST_IMAGES_REVIEW}`, data)
            .then(res => { // then print response status
                console.log(res.statusText)
                window.location.reload(false);

            }).catch((err) => {
                window.alert("Unable to post")
                console.log(err)

            })

    }
    render() {


        return (<div>


            <form onSubmit={this.onClickHandler} enctype="multipart/form-data">
                <div className="reviewCard2">
                    <h5>Post a review</h5>
                    <div class="form-group">
                        <label for="example-input-file"> </label>
                        <input type="file" class="form-control" multiple onChange={this.onChangeHandler} />
                    </div>
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
                        <button type="submit" className="btn btn-danger mt-3">Post Review</button>
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
        customer_id: state.customer_id,
        jwtToken: state.jwtToken
    };
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerReviewCard);