import React, { Component } from 'react';
import './CustomerReviewCard.styles.css'
import StarRatingComponent from 'react-star-rating-component';


class CustomerReviewCard extends Component {
    state = {
        redirect: false
    }

    handleClick = () => {
        console.log(this.props);
        localStorage.setItem('order_id', this.props.props.res.order_id)
        this.props.history.push({
            pathname: '/customer/order',
            state: {
                order_id: this.props.props.res.order_id
            }
        })
    }
    render() {
        // if (this.state.redirect) {
        //     return <Redirect to={
        //         {
        //             pathname: 'menu',
        //             state: {
        //                 restaurant_email: this.props.props.res.email,
        //                 restaurant_id: this.props.props.res.restaurant_id
        //             }
        //         }} />
        // }
        const restData = { ...this.props.props.res }
        // console.log(restData)

        return (<div>
            {/* {JSON.stringify(this.props.props)} */}
            <div className="reviewCard">
                <div className="reviewHeader" >
                    <h4>
                        {restData.customer_name}

                    </h4>

                    {/* <p>
                        {restData.stars}

                    </p> */}
                    <h3><StarRatingComponent
                        name="rating"
                        starCount={5}
                        value={restData.stars}
                        starColor="#ff1c1c"
                    />
                    </h3>
                </div>

                <p>
                    {restData.review_text}
                </p>

            </div>
        </div>
        );
    }
}

export default CustomerReviewCard;
