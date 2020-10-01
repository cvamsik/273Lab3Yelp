import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Login from './components/Common/Login/Login';
import CommonNavbar from './components/Common/Navbar/CommonNavbar';

import CreateUser from './components/Customer/SignUp/CreateCustomer';
import UserHome from './components/Customer/Home/UserHome';
import UserNavbar from './components/Customer/UserNavbar/UserNavbar';
// import UserProfile from './components/Customer/Profile/CustomerProfile';
import UserProfileRedux from './components/Customer/Profile/CustomerProfileRedux';


import RestaurantHome from './components/Restaurant/Home/RestaurantHome';
import RestaurantSignUp from './components/Restaurant/SignUp/RestaurantSignup';
import LandingPage from './components/Common/LandingPage/LandingPage';
import Menu from './components/Restaurant/Menu/Menu';
import CheckOut from './components/Customer/Checkout/Checkout';



//Create a Main Component
class Main extends Component {
    render() {
        return (
            <div>
                {/*Render Different Component based on Route*/}
                <Route exact path="/" component={CommonNavbar} />
                <Route exact path="/" component={LandingPage} />

                <Route exact path="/login" component={Login} />

                <Route path="/customer/" component={UserNavbar} />
                <Route exact path='/customer/home' component={UserHome} />
                <Route exact path="/customerSignup" component={CreateUser} />
                <Route exact path='/customer/profile' component={UserProfileRedux} />

                <Route exact path="/checkout" component={CheckOut} />

                <Route exact path="/restaurant/signup" component={RestaurantSignUp} />
                <Route exact path="/restaurant/home" component={RestaurantHome} />
                <Route exact path="/restaurant/menu" component={Menu} />


            </div>
        )
    }
}
//Export The Main Component
export default Main;