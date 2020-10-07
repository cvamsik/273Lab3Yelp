import Axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import routeConstants, { UPDATE_RESTAURANT_PROFILE } from '../../../Config/routeConstants';
import './RestaurantProfile.styles.css'




class RestaurantProfile extends Component {
    state = {

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
        Axios.get(`${routeConstants.BACKEND_URL}/restaurant${routeConstants.GET_RESTAURANT_PROFILE}`, {
            params: {
                email_id: this.props.email_id
            }
        }).then((res) => {
            console.log(res);
            this.setState({
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
        Axios.put(`${routeConstants.BACKEND_URL}/restaurant${UPDATE_RESTAURANT_PROFILE}`, putData).then((res) => {
            window.alert("Profile Updated")
            console.log(res)
        }).catch((err) => {
            window.alert("Unable to Update")
            console.log(err)

        })
    }
    render() {
        return (
            <div>
                <form className="formData">
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
                            <input onChange={this.inputChangeHandler} type="text" class="form-control" id="restaurant_address" placeholder="1234 Main St" value={this.state.restaurant_address} />
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
                    <div >
                        <button type="submit" onClick={this.handleSubmit} class="btn btn-danger">Update Details</button>
                    </div>
                    {/* <div class="form-group col-md-2">
                            <button type="reset" class="btn btn-danger">Cancel Edit</button>
                        </div> */}
                    {/* </div> */}

                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        email_id: state.loginReducer.user_email,

    };
}

const mapDispatchToProps = (dispatch) => {
    return {


    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantProfile);

