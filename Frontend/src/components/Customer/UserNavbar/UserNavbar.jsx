import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { login, logout } from '../../../reduxConfig/LoginActions'
//create the Navbar Component
class UserNavbar extends Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }
    //handle logout to destroy the cookie
    handleLogout = () => {
        cookie.remove('cookie', { path: '/' });
        this.props.logout();
    }
    render() {
        //if Cookie is set render Logout Button
        let navLogin = null;
        if (cookie.load('cookie') && this.props.loggedIn) {
            console.log("Able to read cookie");
            navLogin = (
                <ul class="nav navbar-nav navbar-right">
                    <li><Link to="/customer/profile">Profile</Link></li>

                    <li><Link to="/" onClick={this.handleLogout}><span class="glyphicon glyphicon-user"></span>Logout</Link></li>

                </ul>
            );
        } else {
            //Else display login button
            console.log("Not Able to read cookie");
            navLogin = (
                <ul class="nav navbar-nav navbar-right">
                    <li><Link to="/login"><span class="glyphicon glyphicon-log-in"></span> Login</Link></li>
                </ul>
            )
        }
        let redirectVar = null;
        if (cookie.load('cookie') === undefined) {

            redirectVar = <Redirect to="/" />
        }
        return (
            <div>
                {redirectVar}
                <nav class="navbar navbar-inverse">
                    <div class="container-fluid">
                        <div class="navbar-header">
                            <a class="navbar-brand">Yelp</a>
                        </div>
                        <ul class="nav navbar-nav">
                            <li class="active"><Link to="/customer/home">Home</Link></li>
                            <li><Link to="/customer/events">Events</Link></li>
                            <li><Link to="/customer/orders">Orders</Link></li>
                        </ul>
                        {navLogin}
                    </div>
                </nav>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loggedIn: state.loginReducer.loggedIn,

    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        // counterIncrement: (counter) => dispatch(counterIncrement(counter))
        login: (loggedIn) => dispatch(login(loggedIn)),
        logout: (loggedIn) => dispatch(logout(loggedIn)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserNavbar);