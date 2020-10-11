import React, { Component } from 'react';
import bgImage from '../../../Assets/BackgroundImages/LandingPage.jpg'
import yelpLogo from '../../../Assets/YelpLogo.svg.png'
import './LandingPage.styles.css'
class LandingPage extends Component {
    state = {}
    render() {
        return (
            <div>
                {/* <img src={bgImage} class="img-fluid" alt="Responsive image" /> */}
                <div class=" jumboImage jumbotron-fluid">
                    <div class="container2">

                        <img src={yelpLogo} width='200px' height='100px' />
                        <div className="searchComp">
                            <form class="form-inline" onSubmit={this.searchHandler}>
                                <input class="form-control mr-sm-2 " type="text" name="search_string" style={{ width: '550px' }} placeholder="Search for Restaurants, Locations and Dishes" value={this.state.searchString} onChange={this.inputChangeHandler} aria-label="Search" />
                                <button class="btn btn-danger my-2 my-sm-0" type="submit">Search</button>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default LandingPage;