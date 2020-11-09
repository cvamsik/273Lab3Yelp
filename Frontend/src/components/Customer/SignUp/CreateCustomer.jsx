import React, { Component } from 'react';
import axios from 'axios';
// import cookie from 'react-cookies';
// import { Redirect } from 'react-router';
// import CustomInput from '../../Common/CustomInput/CustomInput'
import CustomButton from '../../Common/CustomButton/CustomButton'
// import { Link } from "react-router-dom";
import './CreateCustomer.styles.css';
import routeConstants from '../../../Config/routeConstants';
// import signupReducer from '../../../reduxConfig/SignUpReducer';
import {
    nameHandler, emailHandler, passwordHandler, confirmPasswordHandler, birthdayHandler
    , aboutHandler, phoneHandler, userTypeHandler, thingsLovedHandler, findMeHandler, blogsHandler
} from '../../../reduxConfig/CustomerSignUp/SignUpActions'
import { connect } from 'react-redux';
// import Login from '../../Common/Login/Login';
import CommonNavbar from '../../Common/Navbar/CommonNavbar';

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


    // Call the Will Mount to set the auth Flag to false
    componentWillMount() {
        this.setState({
            authFlag: false
        })
    }

    handleChange = (e) => {
        //  console.log(this.state);
        const { value, name } = e.target;
        this.setState({ [name]: value });
    };
    nameHandler = (e) => { console.log("name "); this.props.nameHandler(e.target.value); }
    emailHandler = (e) => { this.props.emailHandler(e.target.value); }
    passwordHandler = (e) => { this.props.passwordHandler(e.target.value); }
    confirmPasswordHandler = (e) => { this.props.confirmPasswordHandler(e.target.value); }
    birthdayHandler = (e) => { this.props.birthdayHandler(e.target.value); }
    aboutHandler = (e) => { this.props.aboutHandler(e.target.value); }
    phoneHandler = (e) => { this.props.phoneHandler(e.target.value); }
    userTypeHandler = (e) => { this.props.userTypeHandler(e.target.value); }
    thingsLovedHandler = (e) => { this.props.thingsLovedHandler(e.target.value); }
    findMeHandler = (e) => { this.props.findMeHandler(e.target.value); }
    blogsHandler = (e) => { this.props.blogsHandler(e.target.value); }

    handleSubmit = async (e) => {
        e.preventDefault();
        const { password, confirmPassword } = this.props;
        console.log(this.props);

        if (password !== confirmPassword) {
            alert("Passwords don't match");
            return;
        }

        try {
            const userdetails = {
                customer_name: this.props.name,
                email_id: this.props.email,
                user_password: this.props.password,
                birthday: this.props.birthday,
                contact_number: this.props.phone,
                about: this.props.about,
                things_loved: this.props.thingsLoved,
                find_me: this.props.findMe,
                blog_ref: this.props.blogs
            };

            console.log(userdetails);

            axios
                .post(`${routeConstants.BACKEND_URL}/customer${routeConstants.POST_CUSTOMER_SIGNUP}`, userdetails)
                .then((response) => {
                    console.log(response);
                    window.alert("Profile created successfully. Please Login.");
                    // this.props.history.push('/login');
                }).catch((err) => {
                    window.alert("Invalid Details. Please Re-enter");
                    console.log(err)
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
        // let redirectVar = null;
        // if (cookie.load('cookie')) {
        //     redirectVar = <Redirect to="/home" />
        // }
        return (
            <div>
                <div className='navbar'>
                    <h4>Navbar</h4>
                    {CommonNavbar}
                </div>
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
                                Name: <input
                                    type="text"
                                    label="Name"
                                    name="name"
                                    //value={this.props.name}
                                    onChange={this.nameHandler}
                                    required
                                />
                                Email:<input
                                    type="email"
                                    label="Email"
                                    name="email"
                                    // value={this.props.email}
                                    onChange={this.emailHandler}
                                    required
                                />
                                Password:<input
                                    type="password"
                                    label="Password"
                                    name="password"
                                    // value={this.props.password}
                                    onChange={this.passwordHandler}
                                    required
                                />
                                Confirm Password:<input
                                    type="password"
                                    label="Confirm Password"
                                    name="confirmPassword"
                                    // value={this.props.confirmPassword}
                                    onChange={this.confirmPasswordHandler}
                                    required
                                />
                                Phone:<input
                                    type="text"
                                    label="Phone Number"
                                    name="phone"
                                    // value={this.props.phone}
                                    onChange={this.phoneHandler}
                                    required
                                />
                                Birthday:<input
                                    type="date"
                                    label="Birthday YYYY-MM-DD"
                                    name="birthday"
                                    // value={this.props.birthday}
                                    onChange={this.birthdayHandler}
                                    required
                                />
                                About:<input
                                    type="text"
                                    label="About"
                                    name="about"
                                    // value={this.props.about}
                                    onChange={this.aboutHandler}
                                    required
                                />
                                Things Loved:<input
                                    type="text"
                                    label="Things Loved"
                                    name="thingsLoved"
                                    // value={this.props.thingsLoved}
                                    onChange={this.thingsLovedHandler}
                                />

                                Find Me @:<input
                                    type="text"
                                    label="Find Me @"
                                    name="findMe"
                                    // value={this.props.findMe}
                                    onChange={this.findMeHandler}
                                />
                                Blogs:<input
                                    type="text"
                                    label="Blogs"
                                    name="blogs"
                                    // value={this.props.blogs}
                                    onChange={this.blogsHandler}
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

const mapStateToProps = (state) => {
    return {
        name: state.signup.name,
        email: state.signup.email_id,
        password: state.signup.password,
        confirmPassword: state.signup.confirmPassword,
        birthday: state.signup.birthday,
        about: state.signup.about,
        phone: state.signup.phone,
        userType: state.signup.user,
        thingsLoved: state.signup.thingsLoved,
        findMe: state.signup.findMe,
        blogs: state.signup.blogs
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        // counterIncrement: (counter) => dispatch(counterIncrement(counter))
        nameHandler: (name) => dispatch(nameHandler(name)),
        emailHandler: (email_id) => dispatch(emailHandler(email_id)),
        passwordHandler: (password) => dispatch(passwordHandler(password)),
        confirmPasswordHandler: (confirmPassword) => dispatch(confirmPasswordHandler(confirmPassword)),
        birthdayHandler: (birthday) => dispatch(birthdayHandler(birthday)),
        aboutHandler: (about) => dispatch(aboutHandler(about)),
        phoneHandler: (phone) => dispatch(phoneHandler(phone)),
        userTypeHandler: (userType) => dispatch(userTypeHandler(userType)),
        thingsLovedHandler: (thingsLoved) => dispatch(thingsLovedHandler(thingsLoved)),
        findMeHandler: (findMe) => dispatch(findMeHandler(findMe)),
        blogsHandler: (blogs) => dispatch(blogsHandler(blogs)),


    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateUser);