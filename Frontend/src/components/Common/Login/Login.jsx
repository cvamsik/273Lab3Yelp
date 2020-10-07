import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import RouteConstants, { POST_LOGIN } from '../../../Config/routeConstants';
import store from '../../../reduxConfig/store';
import { connect } from 'react-redux';
import { emailHandler, passwordHandler, authFlagHandler, login } from '../../../reduxConfig/LoginActions';
import loginImage from '../../../Assets/BackgroundImages/LoginImage.jpg'
import './Login.styles.css'
//Define a Login Component
class Login extends Component {
    state = {
        username: "",
        password: "",
        authFlag: false,
        loginStatus: ""
    }

    componentWillMount() {
        console.log(store);
        this.setState({
            authFlag: false
        })
    }
    inputChangeHandler = (e) => {
        const { value, name } = e.target;
        this.setState({ [name]: value });
    }

    emailChangeHandler = (e) => {
        this.props.emailHandler(e.target.value);
    }

    passwordChangeHandler = (e) => {
        this.props.passwordHandler(e.target.value);
    }
    authFlagChangeHandler = (e) => {
        this.props.authFlagHandler(true);
    }

    //submit Login handler to send a request to the node backend
    // submitLogin = (e) => {
    //     var headers = new Headers();
    //     console.log(this.state);
    //     //prevent page from refresh
    //     e.preventDefault();
    //     const data = {
    //         username: this.state.username,
    //         password: this.state.password
    //     }
    //     let user_type;
    //     //set the with credentials to true
    //     axios.defaults.withCredentials = true;
    //     //make a post request with the user data
    //     axios.post(`${RouteConstants.BACKEND_URL}${POST_LOGIN}`, data)
    //         .then(response => {
    //             console.log("Status Code : ", response.status);
    //             if (response.status === 200) {
    //                 console.log(response.data);
    //                 user_type = response.data.user_type;
    //                 this.setState({
    //                     authFlag: true
    //                 }, () => {
    //                     cookie.save("email", response.data.email_id, {
    //                         path: '/'
    //                     });
    //                     console.log("Updated state");
    //                     if (user_type === "1") {
    //                         console.log("cust redirect");
    //                         cookie.save('cookie');
    //                         this.props.history.push('/customer/home');
    //                     }
    //                     else if (user_type === "2") {
    //                         console.log("rest redirect");
    //                         cookie.save('cookie');
    //                         this.props.history.push('/restaurant/home');
    //                     }
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


    submitLogin = (e) => {
        // var headers = new Headers();
        console.log(this.state);
        //prevent page from refresh
        e.preventDefault();
        const data = {
            username: this.state.username,
            password: this.state.password
        }
        let user_type;
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post(`${RouteConstants.BACKEND_URL}${POST_LOGIN}`, data)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    console.log(response.data);
                    user_type = response.data.user_type;
                    this.setState({
                        authFlag: true
                    }, () => {
                        cookie.save("email", response.data.email_id, {
                            path: '/'
                        });
                        cookie.save("user_type", response.data.user_type, {
                            path: '/'
                        });
                        console.log("Updated state");
                        if (user_type === "1") {
                            console.log("cust redirect");
                            cookie.save('cookie');
                            this.props.login({
                                user_email: this.state.username,
                                user_type: user_type
                            });
                            this.props.history.push('/customer/home');
                        }
                        else if (user_type === "2") {
                            console.log("rest redirect");
                            cookie.save('cookie');
                            this.props.login({
                                user_email: this.state.username,
                                user_type: user_type
                            });
                            this.props.history.push('/restaurant/home');
                        }
                    })

                } else {
                    this.setState({
                        authFlag: false
                    })
                }
            }).catch((err) => {
                console.log(err);
                this.setState({
                    loginStatus: "Login Failed"
                });
                //window.alert("Login Failed");
            });
    }

    render() {
        //redirect based on successful login
        let redirectVar = null;
        if (this.props.loggedIn) {
            redirectVar = <Redirect to="/" />
        }
        return (
            <div className="loginPage">

                <div className="loginImage">
                    <img src={loginImage} alt="loginImage" width='400px' height='550px' />
                </div>
                <div className="loginContainer">
                    {redirectVar}

                    <div className="panel">
                        <p>Enter your username and password</p>
                    </div>

                    <div className="form-group">
                        <input onChange={this.inputChangeHandler} required type="text" className="form-control" name="username" placeholder="Username" />
                    </div>
                    <div className="form-group">
                        <input onChange={this.inputChangeHandler} required type="password" className="form-control" name="password" placeholder="Password" />
                    </div>
                    <button onClick={this.submitLogin} className="btn btn-danger">Login</button>
                    {this.state.loginStatus}


                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        email_id: state.loginReducer.login.email_id,
        password: state.loginReducer.login.password,
        authFlag: state.loginReducer.login.authFlag,
        loggedIn: state.loginReducer.loggedIn
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        // counterIncrement: (counter) => dispatch(counterIncrement(counter))
        emailHandler: (email_id) => dispatch(emailHandler(email_id)),
        passwordHandler: (password) => dispatch(passwordHandler(password)),
        authFlagHandler: (authFlag) => dispatch(authFlagHandler(authFlag)),
        login: (loggedIn) => dispatch(login(loggedIn))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
// export default Login;