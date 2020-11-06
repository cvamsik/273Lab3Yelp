import React, { Component } from "react";
import axios from "axios";
import RouteConstants from "../../../Config/routeConstants";
import "./CustomerProfile.styles.css";
import CustomButton from "../../Common/CustomButton/CustomButton";
import cookie from 'react-cookies';
import {
    nameHandler, birthdayHandler
    , aboutHandler, phoneHandler, userTypeHandler, thingsLovedHandler, findMeHandler, blogsHandler
} from '../../../reduxConfig/CustomerSignUp/SignUpActions';
import { oldDetailsHandler, cancelEditHandler, editStateHandler, loadDetailsHandler } from '../../../reduxConfig/CustomerProfile/ProfileActions';
import { connect } from 'react-redux';



class UserProfile extends Component {
    // state = {
    //     _id: 0,
    //     customer_name: "",
    //     birthday: "",
    //     about: "",
    //     contact_number: "",
    //     userType: "1",
    //     things_loved: "",
    //     find_me: "",
    //     blog_ref: "",


    //     MODIFIED: "",

    //     disabled: true,
    //     editstate: false,
    //     oldDetails: {},
    // };

    // handleChange = (e) => {
    //     //e.preventDefault();
    //     const { value, name } = e.target;
    //     this.setState({ [name]: value });
    //     // console.log(this.state);
    // };
    // handleAddressChange = (e) => {
    //     const { value, name } = e.target;
    //     this.setState((prevState) => ({
    //         ADDRESS: { ...prevState.ADDRESS, [name]: value },
    //     }));
    //     //console.log(this.state);
    // };
    componentWillMount() {

        console.log("in edit profile")
        let body;
        console.log(cookie.load("email"));
        axios.defaults.headers.common['authorization'] = this.props.jwtToken;

        axios.get(`${RouteConstants.BACKEND_URL}/customer${RouteConstants.GET_CUSTOMER_PROFILE}`,
            {
                params: {
                    email_id: cookie.load("email")
                }
            }).then((res) => {

                // console.log(this.state);
                this.props.loadDetailsHandler(res.data[0])
                // this.setState({ oldDetails: { ...res.data[0] }, ...res.data[0] }, () => {
                //     console.log(this.state);
                // });


            })

        // axios
        //   .get(
        //     `${Constants.BACKEND_SERVER}/users/getuser`,
        //     localStorage.getItem("userId")
        //   )
        //   .then((res) => {
        //     const body = res.body;
        //     if (body._id) {
        //       this.setState({
        //         ...body
        //       });

        //     } else {
        //       console.log("Error fetching user data");
        //     }
        //   });
    }

    handleEdit = (e) => {
        e.preventDefault();
        this.props.editStateHandler();
        // this.setState((prevstate) => ({
        //     editstate: !prevstate.editstate,
        //     disabled: !prevstate.disabled,
        // }));
    };
    handleCancelEdit = (e) => {
        e.preventDefault();
        if (!this.state.editstate) {
            // this.setState((prevstate) => ({
            //     // ADDRESS: { ...prevstate.oldData.ADDRESS },
            //     ...prevstate.oldData,
            // }));
            this.props.cancelEditHandler();
        }
    };
    handleSave = (e) => {
        e.preventDefault();
        const {
            disabled,
            editstate,
            oldDetails,
            ...userDetails
        } = this.props;


        const req = {
            ...this.props,
            birthday: this.props.birthday.split("T")[0]
        };
        console.log(req)
        axios
            .put(`${RouteConstants.BACKEND_URL}/customer${RouteConstants.UPDATE_CUSTOMER_PROFILE}`, req)
            .then((res) => {
                console.log(res)
                if (res.status === 200) {
                    window.alert("Changes Updated Successfully");
                }
            }).catch((err) => {
                window.alert("Unable to update changes");
            });
    };

    nameHandler = (e) => { console.log("name "); this.props.nameHandler(e.target.value); }
    birthdayHandler = (e) => { this.props.birthdayHandler(e.target.value); }
    aboutHandler = (e) => { this.props.aboutHandler(e.target.value); }
    phoneHandler = (e) => { this.props.phoneHandler(e.target.value); }
    userTypeHandler = (e) => { this.props.userTypeHandler(e.target.value); }
    thingsLovedHandler = (e) => { this.props.thingsLovedHandler(e.target.value); }
    findMeHandler = (e) => { this.props.findMeHandler(e.target.value); }
    blogsHandler = (e) => { this.props.blogsHandler(e.target.value); }


    render() {
        console.log("props from react--> ")
        if (this.props.birthday) {
            console.log(this.props.birthday.split("T")[0])
        }
        return (

            <div className="profile">
                <form className="userdetails">
                    <h2>Edit Profile Details</h2>
                    <div className="option">
                        Name:{" "}
                        <input
                            label={this.props.oldDetails.customer_name}
                            disabled={this.props.disabled}
                            value={this.props.customer_name}
                            onChange={this.nameHandler}
                            name="customer_name"
                        />
                    </div>
                    <div className="option">
                        Birthday:{" "}
                        <input
                            label={this.props.oldDetails.birthday}
                            disabled={this.props.disabled}
                            value={this.props.birthday.split("T")[0]}
                            onChange={this.birthdayHandler}
                            name="birthday"
                            width="200px"
                        />
                    </div>
                    <div className="option">
                        Contact:{" "}
                        <input
                            label={this.props.oldDetails.contact_number}
                            disabled={this.props.disabled}
                            value={this.props.contact_number}
                            onChange={this.phoneHandler}
                            name="contact_number"
                        />
                    </div>
                    <div className="option">
                        Email: <input disabled value={this.props.email} name="email_id" />
                    </div>


                    <div className="option">
                        About:{" "}
                        <input
                            label={this.props.oldDetails.about}
                            disabled={this.props.disabled}
                            value={this.props.about}
                            onChange={this.aboutHandler}
                            name="about"
                        />
                    </div>
                    <div className="option">
                        Things Loved:{" "}
                        <input
                            label={this.props.oldDetails.things_loved}
                            disabled={this.props.disabled}
                            value={this.props.things_loved}
                            onChange={this.thingsLovedHandler}
                            name="things_loved"
                        />
                    </div>
                    <div className="option">
                        Find me @:{" "}
                        <input
                            label={this.props.oldDetails.find_me}
                            disabled={this.props.disabled}
                            value={this.props.find_me}
                            onChange={this.findMeHandler}
                            name="find_me"
                        />
                    </div>

                    <div className="option">
                        Blog References:{" "}
                        <input
                            label={this.props.oldDetails.blog_ref}
                            disabled={this.props.disabled}
                            value={this.props.blog_ref}
                            onChange={this.blogsHandler}
                            name="blog_ref"
                        />

                    </div>


                    {/* {addresschange} */}
                    <div className="option" style={{ justifyContent: "space-around", marginLeft: '20%' }}>
                        <CustomButton type="submit" onClick={this.handleEdit}>
                            Edit Details
              {/* {this.state.editstate ? "Cancel Edit" : "Edit Details"}{" "} */}
                        </CustomButton>
                        {/* <button type="submit" onClick={this.handleCancelEdit}>
              Restore Changes
              {this.state.editstate ? "Cancel Edit" : "Edit Details"}{" "}
            </button> */}
                        <br />
                        {/* </div>

          <div className="option"> */}
                        <CustomButton type="submit" onClick={this.handleSave}>
                            Save Changes
              {/* {this.state.editstate ? "Cancel Edit" : "Edit Details"}{" "} */}
                        </CustomButton>


                    </div>
                </form>
            </div >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        customer_name: state.ProfileReducer.signup.customer_name,
        email: state.ProfileReducer.signup.email_id,
        birthday: state.ProfileReducer.signup.birthday,
        about: state.ProfileReducer.signup.about,
        contact_number: state.ProfileReducer.signup.contact_number,
        userType: state.ProfileReducer.signup.user,
        things_loved: state.ProfileReducer.signup.things_loved,
        find_me: state.ProfileReducer.signup.find_me,
        blog_ref: state.ProfileReducer.signup.blog_ref,
        oldDetails: state.ProfileReducer.profile.oldDetails,
        disabled: state.ProfileReducer.profile.disabled,
        editstate: state.ProfileReducer.profile.editstate,
        jwtToken: state.jwtToken
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        // counterIncrement: (counter) => dispatch(counterIncrement(counter))
        nameHandler: (name) => dispatch(nameHandler(name)),
        birthdayHandler: (birthday) => dispatch(birthdayHandler(birthday)),
        aboutHandler: (about) => dispatch(aboutHandler(about)),
        phoneHandler: (phone) => dispatch(phoneHandler(phone)),
        userTypeHandler: (userType) => dispatch(userTypeHandler(userType)),
        thingsLovedHandler: (thingsLoved) => dispatch(thingsLovedHandler(thingsLoved)),
        findMeHandler: (findMe) => dispatch(findMeHandler(findMe)),
        blogsHandler: (blog_ref) => dispatch(blogsHandler(blog_ref)),
        oldDetailsHandler: (oldDetails) => dispatch(oldDetailsHandler(oldDetails)),
        cancelEditHandler: (details) => dispatch(cancelEditHandler(details)),
        editStateHandler: (details) => dispatch(editStateHandler(details)),
        loadDetailsHandler: (details) => dispatch(loadDetailsHandler(details)),


    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);