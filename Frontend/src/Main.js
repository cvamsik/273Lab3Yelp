import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Login from './components/Common/Login/Login';
import CommonNavbar from './components/Common/Navbar/CommonNavbar';

import CreateUser from './components/Customer/SignUp/CreateCustomer';
import UserHome from './components/Customer/Home/UserHome';
import UserNavbar from './components/Customer/UserNavbar/UserNavbar';
import UserProfile from './components/Customer/Profile/CustomerProfile';


import RestaurantHome from './components/Restaurant/Home/RestaurantHome';
import RestaurantSignUp from './components/Restaurant/SignUp/RestaurantSignup';



//Create a Main Component
class Main extends Component {
    render() {
        return (
            <div>
                {/*Render Different Component based on Route*/}
                {/* <Route exact path="/" component={CommonNavbar} /> */}
                <Route exact path="/login" component={Login} />

                {/* <Route path="/customer" component={UserNavbar} /> */}
                <Route exact path='/customer/home' component={UserHome} />
                <Route exact path="/customer/signup" component={CreateUser} />
                <Route exact path='/customer/profile' component={UserProfile} />

                <Route exact path="/restaurant/signup" component={RestaurantSignUp} />
                <Route exact path="/restaurant/home" component={RestaurantHome} />

            </div>
        )
    }
}
//Export The Main Component
export default Main;