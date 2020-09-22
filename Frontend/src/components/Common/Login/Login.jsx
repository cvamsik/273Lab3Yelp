import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';

//Define a Login Component
class Login extends Component {
    state = {
        username: "",
        password: "",
        authFlag: false,
        loginStatus: ""
    }

    componentWillMount() {
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
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/login', data)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    console.log(response.data.user_type);
                    this.setState({
                        authFlag: true
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

                <div class="container">

                    <div class="login-form">
                        <div class="main-div">
                            <div class="panel">
                                <p>Please enter your username and password</p>
                            </div>

                            <div class="form-group">
                                <input onChange={this.inputChangeHandler} required type="text" class="form-control" name="username" placeholder="Username" />
                            </div>
                            <div class="form-group">
                                <input onChange={this.inputChangeHandler} required type="password" class="form-control" name="password" placeholder="Password" />
                            </div>
                            <button onClick={this.submitLogin} class="btn btn-primary">Login</button>
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