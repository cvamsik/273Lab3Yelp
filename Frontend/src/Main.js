import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import cookie from 'react-cookies'
import Login from './components/Common/Login/Login';
import CommonNavbar from './components/Common/Navbar/CommonNavbar';
import { connect } from 'react-redux';

import CreateUser from './components/Customer/SignUp/CreateCustomer';
import UserHome from './components/Customer/Home/UserHome';
import UserNavbar from './components/Customer/UserNavbar/UserNavbar';
import UserProfile from './components/Customer/Profile/CustomerProfile';
import UserProfileRedux from './components/Customer/Profile/CustomerProfileRedux';
import RestaurantList from './components/Customer/RestaurantList/RestaurantList'

import RestaurantHome from './components/Restaurant/Home/RestaurantHome';
import RestaurantSignUp from './components/Restaurant/SignUp/RestaurantSignup';
import LandingPage from './components/Common/LandingPage/LandingPage';
import Menu from './components/Restaurant/Menu/Menu';
import CheckOut from './components/Customer/Checkout/Checkout';
import Payment from './components/Customer/Payment/Payment';
import Orders from './components/Customer/Orders/Orders'
import OrderDetails from './components/Customer/OrderDetails/OrderDetails';
import RestaurantNavbar from './components/Restaurant/RestaurantNavbar/RestaurantNavbar';
import RestaurantProfile from './components/Restaurant/RestaurantProfile/RestaurantProfile';
import RestaurantMenu from './components/Restaurant/RestaurantMenu/RestaurantMenu';
import CreateMenuItem from './components/Restaurant/CreateMenuItem/CreateMenuItem'
import RestaurantOrders from './components/Restaurant/Orders/RestaurantOrders';
import RestaurantOrderDetails from './components/Restaurant/Orders/OrderDetails/RestaurantOrderDetails';
import RestaurantReviews from './components/Restaurant/RestaurantReviews/RestaurantReviews'
import CustomerSelfReviews from './components/Customer/CustomerReviews/CustomerSelfReviews'
import DisplayEvents from './components/Events/EventList/DisplayEvents';
import CreateEvent from './components/Events/CreateEvent/CreateEvent';
import DisplayRestaurantEvents from './components/Events/EventList/DisplayRestaurantEvents';
import DisplayRegistrationsRestaurant from './components/Events/EventList/DisplayRegistrationsRestaurant';
import DisplayRegistrationsCustomer from './components/Events/EventList/DisplayRegistrationsCustomer';
import EventsHome from './components/Restaurant/Home/EventsHome';



//Create a Main Component
class Main extends Component {
    render() {
        // console.log(this.props)
        let navbarRender = ""
        if (this.props.loggedIn) {
            if (this.props.user_type == 1) {
                navbarRender = <Route path="/customer" component={UserNavbar} />
            }
            else if (this.props.user_type == 2) {
                navbarRender = <Route path="/restaurant" component={RestaurantNavbar} />
            }
        }
        else {
            navbarRender = <Route path="/" component={CommonNavbar} />
        }
        return (
            <div>
                {/*Render Different Component based on Route*/}
                {navbarRender}

                <Route exact path="/" component={LandingPage} />

                <Route exact path="/login" component={Login} />

                <Route exact path='/customer/home' component={UserHome} />
                <Route exact path="/customer/signup" component={CreateUser} />
                <Route exact path='/customer/profile' component={UserProfile} />
                <Route exact path='/customer/restaurants' component={RestaurantList} />
                <Route exact path='/customer/checkout' component={CheckOut} />
                <Route exact path="/customer/payment" component={Payment} />
                <Route exact path="/customer/restaurant/menu" component={Menu} />
                <Route exact path="/customer/orders" component={Orders} />
                <Route exact path="/customer/order" component={OrderDetails} />
                <Route exact path="/customer/reviews" component={CustomerSelfReviews} />
                <Route exact path="/customer/events" component={DisplayEvents} />
                <Route exact path="/customer/events/registrations" component={DisplayRegistrationsCustomer} />



                <Route exact path="/restaurant/signup" component={RestaurantSignUp} />
                <Route exact path="/restaurant/home" component={RestaurantHome} />
                <Route exact path="/restaurant/profile" component={RestaurantProfile} />
                <Route exact path="/restaurant/menu/create" component={CreateMenuItem} />
                <Route exact path="/restaurant/orders" component={RestaurantOrders} />
                <Route exact path="/restaurant/orderDetails" component={RestaurantOrderDetails} />
                <Route exact path="/restaurant/menu/list" component={RestaurantMenu} />
                <Route exact path="/restaurant/reviews" component={RestaurantReviews} />
                <Route exact path="/restaurant/events/create" component={CreateEvent} />
                <Route exact path="/restaurant/events/list" component={DisplayRestaurantEvents} />
                <Route exact path="/restaurant/events/all" component={DisplayEvents} />
                <Route exact path="/restaurant/events/registrations" component={DisplayRegistrationsRestaurant} />
                <Route exact path="/restaurant/events/home" component={EventsHome} />


            </div>
        )
    }
}
//Export The Main Component
// export default Main;
const mapStateToProps = (state) => {
    return {
        loggedIn: state.loginReducer.loggedIn,
        user_type: state.loginReducer.user_type
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        // counterIncrement: (counter) => dispatch(counterIncrement(counter))
        // logout: (loggedIn) => dispatch(logout(loggedIn)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
