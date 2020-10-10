import Axios from 'axios';
import React, { Component } from 'react';
import routeConstants from '../../../Config/routeConstants'
import RestaurantCard from './RestaurantCard/RestaurantCard';
import './RestaurantList.styles.css'
class RestaurantList extends Component {
    state = {
        resData: [],
        search_string: ""
    }
    componentDidMount = () => {
        console.log(localStorage.getItem('search_string'))
        if (localStorage.getItem('search_string')) {
            console.log("In search part")
            Axios.get(`${routeConstants.BACKEND_URL}/restaurant${routeConstants.GET_RESTAURANT_SEARCH}`, {
                params: {
                    search_string: localStorage.getItem('search_string')
                }
            }).then((res) => {
                console.log(res.data);
                this.setState({ resData: [...res.data] })
            }).catch((err) => {
                console.log(err);
            })
        }
        else {
            console.log("not search part")

            Axios.get(`${routeConstants.BACKEND_URL}/restaurant${routeConstants.GET_ALL_RESTAURANTS}`).then((res) => {
                // console.log(res.data[0]);
                this.setState({ resData: [...res.data] })
            }).catch((err) => {
                console.log(err);
            })
        }
    }

    inputChangeHandler = (e) => {
        const { value, name } = e.target;
        this.setState({ [name]: value });
    }
    searchHandler = (e) => {
        // console.log("search submitted");
        e.preventDefault()
        Axios.get(`${routeConstants.BACKEND_URL}/restaurant${routeConstants.GET_RESTAURANT_SEARCH}`, {
            params: {
                search_string: this.state.search_string
            }
        }).then((res) => {
            console.log(res.data);
            this.setState({ resData: [...res.data] })
        }).catch((err) => {
            console.log(err);
        })
    }

    render() {
        let resList = []
        if (this.state.resData.length > 0) {
            resList = this.state.resData.map((res) => {
                let obj = {
                    res: res,
                    props: this.props
                }
                return <RestaurantCard props={obj} />

            })

        }
        return (
            <div className="cont">

                <div className="searchComp">
                    <form class="form-inline" onSubmit={this.searchHandler}>
                        <input class="form-control mr-sm-2" type="text" name="search_string" style={{ width: '450px' }} placeholder="Search for Restaurants, Locations and Dishes" value={this.state.searchString} onChange={this.inputChangeHandler} aria-label="Search" />
                        <button class="btn btn-outline-danger my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </div>




                <div className="resList">
                    {/* <RestaurantCard props={this.state.resData[0]} /> */}
                    {resList}
                </div>
            </div>);
    }
}

export default RestaurantList;