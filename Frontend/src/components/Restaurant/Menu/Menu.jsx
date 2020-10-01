import React, { Component } from 'react';
import axios from 'axios';
import constants from '../../../Config/routeConstants'
import cookie from 'react-cookies'
import MenuItem from '../MenuItem/MenuItem';
import './Menu.styles.css'
class Menu extends Component {
    state = {
        res: []
    }
    componentDidMount() {
        axios.get(`${constants.BACKEND_URL}/restaurant/${constants.GET_RESTAURANT_MENU}`, {
            params:
                { email: cookie.load('email') }
        }).then((res) => {
            this.setState({ res: res.data });
            console.log(res.data);

        }).catch((err) => {
            console.log(err);
            window.alert("Failed to load menu");
        })
    }
    render() {
        let dishes = this.state.res.map((dish) =>
            <MenuItem menuItem={dish} />
        )
        return (
            <div className="menuList">
                {dishes}


            </div>
        );
    }
}

export default Menu;