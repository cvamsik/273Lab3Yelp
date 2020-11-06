import React, { Component } from 'react';
import './CustomerReviewCard.styles.css'
import StarRatingComponent from 'react-star-rating-component';


class CustomerReviewCard extends Component {
    state = {
        redirect: false
    }


    render() {

        const restData = { ...this.props.props.res }
        console.log(restData)
        let renderItem;
        if (restData) {
            renderItem = <div className="reviewCard">
                <div className="reviewHeader" >
                    <h5>
                        {restData.customer_id.customer_name}

                    </h5>

                    <p>
                        {restData.review_date.split('T')[0]}
                    </p>
                    <h3><StarRatingComponent
                        name="rating"
                        starCount={5}
                        value={restData.stars}
                        starColor="#ff1c1c"
                    />
                    </h3>

                </div>
                <h4>
                    {restData.restaurant_name}
                </h4>
                <p>
                    {restData.review_text}
                </p>

            </div>
        }
        else {
            renderItem = <h4>Unable to load</h4>
        }
        return (<div>
            {/* {JSON.stringify(this.props.props)} */}
            {renderItem}
        </div>
        );
    }
}

export default CustomerReviewCard;
