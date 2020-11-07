import Axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import routeConstants, { UPDATE_RESTAURANT_PROFILE } from '../../../Config/routeConstants';
import './RestaurantProfile.styles.css'
import { cookie } from 'react-cookies';




class RestaurantProfile extends Component {
    state = {
        loaded: false,
        address_city: "",
        address_latitude: 0,
        address_longitude: 0,
        address_postal_code: "",
        address_state: "",
        close_time: "",
        email: "",
        is_open: -1,
        open_time: "",
        primary_phone: 0,
        restaurant_address: "",
        restaurant_description: "",
        restaurant_location: "",
        restaurant_name: "",
        secondary_phone: 0


    }
    componentDidMount() {
        // console.log(this.props)
        Axios.defaults.headers.common['Authorization'] = this.props.jwtToken;
        Axios.get(`${routeConstants.BACKEND_URL}/restaurant${routeConstants.GET_RESTAURANT_PROFILE}`, {
            params: {
                email_id: this.props.email_id
            }
        }).then((res) => {
            console.log(res);
            this.setState({
                loaded: true,
                ...res.data[0]
            })
        }).catch((err) => {
            console.log(err)
        })
    }

    inputChangeHandler = (e) => {
        const { value, id } = e.target;
        this.setState({ [id]: value });
    }

    handleSubmit = (e) => {
        // e.preventDefault();
        const putData = {
            ...this.state
        }
        // console.log(`${routeConstants.BACKEND_URL}/orders${UPDATE_RESTAURANT_PROFILE}`);
        Axios.defaults.headers.common['Authorization'] = this.props.jwtToken;
        Axios.put(`${routeConstants.BACKEND_URL}/restaurant${UPDATE_RESTAURANT_PROFILE}`, putData).then((res) => {
            window.alert("Profile Updated")
            console.log(res)
        }).catch((err) => {
            window.alert("Unable to Update")
            console.log(err)

        })
    }



    onFileUpload = e => {
        // e.preventDefault();
        console.log(this.state)
        //  this.setState({ projectId: this.props.match.params.projectId })
        let formData = new FormData();

        formData.append("file", this.state.selectedFile);
        formData.append('customer_id', this.state.customer_id)
        formData.append('customer_name', this.state.customer_name)
        formData.append('email_id', cookie.load('email'))

        console.log(this.state)
        console.log(JSON.stringify(formData.get("customer_id")))
        Axios
            .post(
                `${routeConstants.BACKEND_URL}/images${routeConstants.POST_IMAGE_USER_PROFILE}`,
                // {
                //     file: formData,
                //     customer_id: this.state.customer_id,
                //     customer_name: this.state.customer_name
                // }
                formData
            )
            .then(response => {
                window.location.reload(false)
            });
    };


    fileData = () => {
        if (this.state.selectedFile) {
            return (
                <div>

                    <p>File Name: {this.state.selectedFile.name}</p>

                </div>
            );
        }
        // else {
        //     return (
        //         <div>
        //             <br />
        //             <p>Choose before Pressing the Upload button</p>
        //         </div>
        //     );
        // }
    };




    onFileChange = event => {

        this.setState({ selectedFile: event.target.files[0] });
        if (this.state.selectedFile) {
            this.setState({ app: this.state.selectedFile.name });
        }
    };
    render() {
        let profileURL = `${routeConstants.BACKEND_URL}${this.state.image_path}`
        let renderVar;
        if (this.state.loaded) {
            renderVar = <form className="formData6">
                <div className="imageDiv">
                    <img src={profileURL} width='250px' height='250px' alt="profileImage" className="imageCont" />
                    <input type="file" onChange={this.onFileChange} />
                    <button className="btn btn-danger" style={{ width: '100px' }} onClick={this.onFileUpload}>Upload!</button>
                    {this.fileData()}
                </div>
                <div className="profile">
                    {/* <div class="form-row"> */}
                    <div class="form-group col-md-3">
                        <label>Email</label>
                        <input type="email" class="form-control" id="email" placeholder="Email" value={this.state.email} disabled />
                    </div>
                    <div class="form-group col-md-3">
                        <label >Restaurant Name</label>
                        <input type="text" class="form-control" id="restaurant_name" placeholder="Password" value={this.state.restaurant_name} disabled />
                    </div>
                    {/* </div> */}
                    {/* <div class="form-row"> */}
                    <div class="form-group col-md-5">
                        <label >Address</label>
                        <input onChange={this.inputChangeHandler} type="text" class="form-control" id="restaurant_address" placeholder="Restaurant Address" value={this.state.restaurant_address} />
                    </div>
                    <div class="form-group col-md-2">
                        <label >Zip</label>
                        <input type="text" onChange={this.inputChangeHandler} class="form-control" id="address_postal_code" value={this.state.address_postal_code} />
                    </div>
                    {/* </div> */}

                    {/* <div class="form-row"> */}
                    <div class="form-group col-md-3">
                        <label>Latitude</label>
                        <input type="text" onChange={this.inputChangeHandler} class="form-control" id="address_latitude" value={this.state.address_latitude} />
                    </div>
                    <div class="form-group col-md-3">
                        <label >Longitude</label>
                        <input type="text" onChange={this.inputChangeHandler} class="form-control" id="address_longitude" value={this.state.address_longitude} />

                    </div>
                    {/* </div> */}

                    {/* <div class="form-row"> */}
                    <div class="form-group col-md-3">
                        <label>Primary Phone</label>
                        <input type="text" onChange={this.inputChangeHandler} class="form-control" id="primary_phone" value={this.state.primary_phone} />
                    </div>
                    <div class="form-group col-md-3">
                        <label >Secondary Phone</label>
                        <input type="text" onChange={this.inputChangeHandler} class="form-control" id="secondary_phone" value={this.state.secondary_phone} />
                    </div>
                    {/* </div> */}
                    {/* <div class="form-row"> */}
                    <div class="form-group col-md-3">
                        <label >City</label>
                        <input type="text" onChange={this.inputChangeHandler} class="form-control" id="address_city" value={this.state.address_city} />
                    </div>
                    <div class="form-group col-md-3">
                        <label >State</label>
                        <input type="text" onChange={this.inputChangeHandler} class="form-control" id="address_state" value={this.state.address_state} />

                    </div>
                    {/* </div> */}

                    {/* <div class="form-row"> */}


                    <div class="form-group col-md-2">
                        <label >Open Time</label>
                        <input type="time" onChange={this.inputChangeHandler} class="form-control" id="open_time" value={this.state.open_time} />
                    </div>
                    <div class="form-group col-md-2">
                        <label >Close Time</label>
                        <input type="time" onChange={this.inputChangeHandler} class="form-control" id="close_time" value={this.state.close_time} />
                    </div>
                </div>
                {/* </div> */}
                {/* <div class="form-row"> */}
                <div></div>
                <div >
                    <button type="submit" onClick={this.handleSubmit} class="btn btn-danger">Update Details</button>
                </div>
                {/* <div class="form-group col-md-2">
                    <button type="reset" class="btn btn-danger">Cancel Edit</button>
                </div> */}
                {/* </div> */}

            </form>
        }

        return (
            <div className="resProfile">
                {renderVar}

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    // console.log(state)
    return {
        email_id: state.user_email,
        jwtToken: state.jwtToken
    };
}

const mapDispatchToProps = (dispatch) => {
    return {


    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantProfile);

