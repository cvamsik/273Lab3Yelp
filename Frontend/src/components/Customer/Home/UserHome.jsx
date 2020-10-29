import React, { Component } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { counterIncrement } from '../../../reduxConfig/LoginActions';
import { connect } from 'react-redux';
import routeConstants from '../../../Config/routeConstants'

import './UserHome.styles.css'
import yelpLogo from '../../../Assets/YelpLogo.svg.png'
import Axios from 'axios';

import RestaurantList from '../RestaurantList/RestaurantList'
class UserHome extends Component {

    state = {
        search_string: ""
    }
    inputChangeHandler = (e) => {
        const { value, name } = e.target;
        this.setState({ [name]: value });
    }
    searchHandler = (e) => {

        localStorage.setItem('search_string', this.state.search_string);
        this.props.history.push('/customer/restaurants')
    }

    render() {

        return (
            <div>
                <div className="jumbotron jumbotron-fluid">
                    <div className="container2">

                        <img src={yelpLogo} width='200px' height='100px' />
                        <div className="searchComp">
                            <form className="form-inline" onSubmit={this.searchHandler}>
                                <input className="form-control mr-sm-2 " type="text" name="search_string" style={{ width: '550px' }} placeholder="Search for Restaurants, Locations and Dishes" value={this.state.searchString} onChange={this.inputChangeHandler} aria-label="Search" />
                                <button className="btn btn-danger my-2 my-sm-0" type="submit">Search</button>
                            </form>
                        </div>

                    </div>
                </div>






                {/* <RestaurantList/> */}
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        // counterState: state.loginReducer.counter,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        // counterIncrement: (counter) => dispatch(counterIncrement(counter))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserHome);
