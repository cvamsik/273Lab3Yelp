import Axios from 'axios';
import React, { Component } from 'react';
import './ImageCarousel.styles.css'
import { connect } from 'react-redux'
import constants from '../../../Config/routeConstants'
import { ReactPhotoCollage } from "react-photo-collage";


class ImageCarousel extends Component {
    state = {
        res: []
    }
    componentDidMount() {
        let imgArr = []
        Axios.get(`${constants.BACKEND_URL}/images${constants.GET_RESTAURANT_IMAGES}`, {
            params:
                { restaurant_id: this.props.restaurant_id }
        }).then((res) => {
            // console.log(res.data);

            if (res.data.length > 0) {
                res.data.map((imgs, i) => {
                    let key = i
                    imgs.images.map((img, j) => {
                        let key = j
                        imgArr.push(
                            { src: img.split('?')[0] })

                    })
                })
            }
            this.setState({ res: imgArr }, () => {
                // console.log(this.state)

            });

        }).catch((err) => {
            console.log(err);
            window.alert("Failed to load Images");
        })
    }
    render() {
        const setting = {
            width: '100%',
            height: ['250px', '170px'],
            layout: [4, 3],
            showNumOfRemainingPhotos: true,
            photos: this.state.res
        };

        return (
            <div>
                {this.state.res.length > 0 ? <ReactPhotoCollage {...setting} /> : ""}
            </div>
        );
    }
}

// export default ImageCarousel;

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

export default connect(mapStateToProps, mapDispatchToProps)(ImageCarousel);