import React, { Component } from 'react';
import './CustomerReviewCard.styles.css'
import StarRatingComponent from 'react-star-rating-component';
import ModalImage from "react-modal-image";


class CustomerReviewCard extends Component {
    state = {
        redirect: false
    }


    render() {


        const restData = { ...this.props.props.res }
        console.log(restData)
        let renderItem;
        let imageList
        if (restData) {
            console.log(restData.images.length)
            if (restData.images.length > 0) {
                imageList = restData.images.map((img, i) => {
                    img = img.split('?')[0]
                    return <ModalImage
                        small={img}
                        large={img}
                        alt="Review Image"
                        key={i}
                        hideDownload={true}
                        className="imageDisplay"
                    />;
                })
            }
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
                <div className="imageList">
                    {imageList}
                </div>
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
