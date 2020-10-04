import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { logout } from '../../../reduxConfig/LoginActions'
import { connect } from 'react-redux';

//create the Navbar Component
class RestaurantNavbar extends Component {
    // constructor(props) {
    //     super(props);
    //     this.handleLogout = this.handleLogout.bind(this);
    // }
    handleLogout = () => {
        cookie.remove('cookie', { path: '/' });
        cookie.remove('email', { path: '/' });
        cookie.remove('user_type', { path: '/' });
        this.props.logout();
        this.props.history.push('/')
        // <Redirect to="/somewhere/else" />

    }
    render() {



        return (
            <div>

                <nav class="navbar navbar-expand-lg navbar-light bg-danger">
                    <a class="navbar-brand" href="/">Yelp!</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav mr-auto">
                            <li class="nav-item active">
                                <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
                            </li>
                            {/* <li class="nav-item">
                                <a class="nav-link" href="#">Customer Sign Up</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Restaurant Sign Up</a>
                            </li> */}
                            <li class="nav-item">
                                <a class="nav-link" href="/restaurant/events">Events</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="restaurant/orders">Orders</a>
                            </li>
                            {/* 
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Join Us!
                                  </a>
                                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <a class="dropdown-item" href="#">Customer</a>
                                    <a class="dropdown-item" href="#">Restaurant</a>
                                    <div class="dropdown-divider"></div>
                                    <a class="dropdown-item" href="#">Something else here</a>
                                </div>
                            </li> */}
                            {/* <li class="nav-item">
                                <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                            </li> */}
                        </ul>

                        {/* <form class="form-inline my-2 my-lg-0">
                            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </form> */}
                        < button class="nav-link" style={{
                            backgroundColor: "Transparent",
                            border: "none",
                            cursor: "pointer",
                            overflow: "hidden",
                            outline: "none"
                        }} onClick={this.handleLogout}>Logout </button>

                    </div>
                </nav>


            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {

    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        // counterIncrement: (counter) => dispatch(counterIncrement(counter))
        logout: (loggedIn) => dispatch(logout(loggedIn)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantNavbar);

// export default RestaurantNavbar;