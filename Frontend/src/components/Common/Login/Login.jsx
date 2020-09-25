import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import RouteConstants, { POST_LOGIN } from '../../../Config/routeConstants';
import store from '../../../reduxConfig/store';

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

    //submit Login handler to send a request to the node backend
    submitLogin = (e) => {
        var headers = new Headers();
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
                        console.log("Updated state");
                        if (user_type === "1") {
                            console.log("cust redirect");
                            cookie.save('cookie');
                            this.props.history.push('/customer/home');
                        }
                        else if (user_type === "2") {
                            console.log("rest redirect");
                            cookie.save('cookie');
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
        if (cookie.load('cookie')) {
            redirectVar = <Redirect to="/home" />
        }
        return (
            <div>
                {redirectVar}

                <div className="container">

                    <div className="login-form">
                        <div className="main-div">
                            <div className="panel">
                                <p>Please enter your username and password</p>
                            </div>

                            <div className="form-group">
                                <input onChange={this.inputChangeHandler} required type="text" className="form-control" name="username" placeholder="Username" />
                            </div>
                            <div className="form-group">
                                <input onChange={this.inputChangeHandler} required type="password" className="form-control" name="password" placeholder="Password" />
                            </div>
                            <button onClick={this.submitLogin} className="btn btn-primary">Login</button>
                            {this.state.loginStatus}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
//export Login Component
export default Login;