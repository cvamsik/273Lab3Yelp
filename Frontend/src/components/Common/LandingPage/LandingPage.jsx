import React, { Component } from 'react';
import bgImage from '../../../Assets/BackgroundImages/LandingPage.jpg'

class LandingPage extends Component {
    state = {}
    render() {
        return (
            <div>
                <img src={bgImage} class="img-fluid" alt="Responsive image" />
            </div>
        );
    }
}

export default LandingPage;