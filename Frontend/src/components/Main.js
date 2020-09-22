import React, { Component } from 'react';
import { Route } from 'react-router-dom';

// import Navbar from './LandingPage/Navbar';
import Login from './Common/Login/Login';

import CreateUser from './User/SignUp/CreateUser';
import UserHome from './User/Home/UserHome';


import RestaurantHome from './Restaurant/Home/RestaurantHome';
import RestaurantSignUp from './Restaurant/SignUp/RestaurantSignup';



//Create a Main Component
class Main extends Component {
    render() {
        return (
            <div>
                {/*Render Different Component based on Route*/}
                {/* <Route path="/" component={Navbar} /> */}
                <Route exact path="/login" component={Login} />
                <Route exact path='/user/home' component={UserHome} />
                <Route exact path="/user/signup" component={CreateUser} />

                <Route exact path="/restaurant/signup" component={RestaurantSignUp} />
                <Route exact path="/restaurant/home" component={RestaurantHome} />

            </div>
        )
    }
}
//Export The Main Component
export default Main;