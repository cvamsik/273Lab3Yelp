import React, { Component } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import loginAction from '../../../reduxConfig/LoginActions';



class UserHome extends Component {
    state = {

    }
    componentWillMount = () => {

    }

    handleClick = (e) => {
         const isLogged = useSelector(state => state.loggedIn);
         console.log(isLogged+"---");
        // useDispatch(loginAction);

    }
    render() {

        return (
            <div>            <h1>
                User Home
              
            </h1>
            <button onClick={this.handleClick}>click</button></div>

        );
    }
}

export default UserHome;