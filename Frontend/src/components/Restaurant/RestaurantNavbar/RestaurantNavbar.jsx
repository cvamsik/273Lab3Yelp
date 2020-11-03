import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { logout } from '../../../reduxConfig/Login/LoginActions'
import { connect } from 'react-redux';
import yelpLogo from '../../../Assets/YelpLogo.svg.png'

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
        localStorage.clear();

        this.props.logout();
        this.props.history.push('/')

    }
    render() {

        let redirectVar = null;
        if (cookie.load('cookie') === undefined) {

            redirectVar = <Redirect to="/" />
        }

        return (
            <div>
                {redirectVar}

                <nav className="navbar navbar-expand-lg navbar-light bg-danger ">
                    <a className="navbar-brand" href="/restaurant/home"><img src={yelpLogo} alt="yelpLogo" width='90px' /></a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link text-light" href="/restaurant/home">Home <span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item dropdown ">
                                <a className="nav-link dropdown-toggle text-light" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Menu
                                  </a>
                                <div className="dropdown-menu " aria-labelledby="navbarDropdown">
                                    <a className="dropdown-item text-danger" href="/restaurant/menu/list">View and Update</a>
                                    <a className="dropdown-item text-danger" href="/restaurant/menu/create">Add a dish</a>
                                </div>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle text-light" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Events
                                  </a>
                                <div className="dropdown-menu " aria-labelledby="navbarDropdown">
                                    <a className="dropdown-item text-danger" href="/restaurant/events/create">Create</a>
                                    <a className="dropdown-item text-danger" href="/restaurant/events/list">View Your Events</a>
                                    <a className="dropdown-item text-danger" href="/restaurant/events/all" >View All Events</a>

                                    {/* <div className="dropdown-divider"></div> */}
                                </div>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-light" href="/restaurant/reviews">Reviews</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-light" href="/restaurant/orders">Orders</a>
                            </li>


                            {/* <li className="nav-item">
                                <a className="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                            </li> */}
                        </ul>

                        {/* <form className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </form> */}
                        <a className="nav-link text-light" style={{ color: "black" }} href="/restaurant/profile">Profile</a>
                        < button className="nav-link text-light" style={{
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