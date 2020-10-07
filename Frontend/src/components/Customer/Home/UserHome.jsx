import React, { Component } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {counterIncrement}  from '../../../reduxConfig/LoginActions';
import {connect} from 'react-redux';

import RestaurantList from '../RestaurantList/RestaurantList'
class UserHome extends Component {



   
    render() {

        return (
            <div> 
                           <h1>
                User Home
              
            </h1>
            <RestaurantList/>
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
