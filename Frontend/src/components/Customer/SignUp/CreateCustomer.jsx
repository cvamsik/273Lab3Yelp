import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import CustomInput from '../../Common/CustomInput/CustomInput'
import CustomButton from '../../Common/CustomButton/CustomButton'
import { Link } from "react-router-dom";
import './CreateCustomer.styles.css';
import Constants from '../../../Config/Constants'
import routeConstants from '../../../Config/routeConstants';

//Define a Login Component
class CreateUser extends Component {

    state = {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        birthday: "",
        about: "",
        phone: "",
        userType: "1",
        thingsLoved: "",
        findMe: "",
        blogs: ""
    };
    //Bind the handlers to this class
    // this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
    // this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    // this.submitLogin = this.submitLogin.bind(this);

    //Call the Will Mount to set the auth Flag to false
    // componentWillMount() {
    //     this.setState({
    //         authFlag: false
    //     })
    // }

    //submit Login handler to send a request to the node backend
    // submitLogin = (e) => {
    //     var headers = new Headers();
    //     //prevent page from refresh
    //     e.preventDefault();
    //     const data = {
    //         username: this.state.username,
    //         password: this.state.password
    //     }
    //     //set the with credentials to true
    //     axios.defaults.withCredentials = true;
    //     //make a post request with the user data
    //     axios.post('http://localhost:3001/login', data)
    //         .then(response => {
    //             console.log("Status Code : ", response.status);
    //             if (response.status === 200) {
    //                 this.setState({
    //                     authFlag: true
    //                 })
    //             } else {
    //                 this.setState({
    //                     authFlag: false
    //                 })
    //             }
    //         }).catch((err) => {
    //             console.log(err);
    //             this.setState({
    //                 loginStatus: "Login Failed"
    //             });
    //             //window.alert("Login Failed");
    //         });
    // }

    handleChange = (e) => {
        //  console.log(this.state);
        const { value, name } = e.target;
        this.setState({ [name]: value });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const { password, confirmPassword } = this.state;

        if (password !== confirmPassword) {
            alert("Passwords don't match");
            return;
        }

        try {
            const userdetails = {
                NAME: this.state.name,
                EMAIL: this.state.email,
                PASSWORD: this.state.password,
                BIRTHDAY: this.state.birthday,
                PHONE: this.state.phone,
                ABOUT: this.state.about,
                THINGS_LOVED: this.state.thingsLoved,
                FIND_ME: this.state.findMe,
                BLOG_REF: this.state.blogs
            };

            console.log(userdetails);

            axios
                .post(`${Constants.BACKEND_SERVER.URL}/customer${routeConstants.POST_CUSTOMER_SIGNUP}`, userdetails)
                .then((response) => {
                    console.log(response);
                }).catch((err) => {
                    window.alert("Invalid Details. Please Re-enter");

                });

            // this.setState({
            //   userName: "",
            //   email: "",
            //   password: "",
            //   confirmPassword: "",
            //   dlNumber: "",
            //   dlState: "",
            //   street: "",
            //   state: "",
            //   country: "",
            //   pin: "",
            //   phone: ""
            // });
        } catch (err) {
            console.log(err);
        }
    };



    render() {
        //redirect based on successful login
        let redirectVar = null;
        // if (cookie.load('cookie')) {
        //     redirectVar = <Redirect to="/home" />
        // }
        return (
            <div>
                {/* {redirectVar} */}

                <div className="signUp">
                    <h1>New User?</h1>
                    <h2>Create an account </h2>
                    <h5>   with Email and Password</h5>
                    {/* <Link to="/users/login" style={{ textDecoration: "none" }}>
                        Have an account? SignIn!
        </Link> */}

                    <div className="signUpForm">
                        <form onSubmit={this.handleSubmit}>
                            <div className="inputs">
                                <CustomInput
                                    type="text"
                                    label="Name"
                                    name="name"
                                    value={this.state.name}
                                    handleChange={this.handleChange}
                                    required
                                />
                                <CustomInput
                                    type="email"
                                    label="Email"
                                    name="email"
                                    value={this.state.email}
                                    handleChange={this.handleChange}
                                    required
                                />
                                <CustomInput
                                    type="password"
                                    label="Password"
                                    name="password"
                                    value={this.state.password}
                                    handleChange={this.handleChange}
                                    required
                                />
                                <CustomInput
                                    type="password"
                                    label="Confirm Password"
                                    name="confirmPassword"
                                    value={this.state.confirmPassword}
                                    handleChange={this.handleChange}
                                    required
                                />
                                <CustomInput
                                    type="text"
                                    label="Phone Number"
                                    name="phone"
                                    value={this.state.phone}
                                    handleChange={this.handleChange}
                                    required
                                />
                                <CustomInput
                                    type="text"
                                    label="Birthday YYYY-MM-DD"
                                    name="birthday"
                                    value={this.state.birthday}
                                    handleChange={this.handleChange}
                                    required
                                />
                                <CustomInput
                                    type="text"
                                    label="About"
                                    name="about"
                                    value={this.state.about}
                                    handleChange={this.handleChange}
                                    required
                                />
                                <CustomInput
                                    type="text"
                                    label="Things Loved"
                                    name="thingsLoved"
                                    value={this.state.thingsLoved}
                                    handleChange={this.handleChange}
                                />

                                <CustomInput
                                    type="text"
                                    label="Find Me @"
                                    name="findMe"
                                    value={this.state.findMe}
                                    handleChange={this.handleChange}
                                />
                                <CustomInput
                                    type="text"
                                    label="Blogs"
                                    name="blogs"
                                    value={this.state.blogs}
                                    handleChange={this.handleChange}
                                />
                            </div>
                            <CustomButton type="submit">SignUp</CustomButton>
                        </form>
                    </div>
                </div>
    );
            </div>
        )
    }
}
//export Login Component
export default CreateUser;