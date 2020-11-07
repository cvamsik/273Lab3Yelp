import React, { Component } from 'react';
import cookie from 'react-cookies';
import './Message.styles.css'
import { connect } from 'react-redux';

class Message extends Component {
    state = {}

    render() {
        // console.log(this.props)
        const ifSender = this.props.user === this.props.user_type ? 'isSender' : '';
        return (
            <div className={`message ${ifSender}`}>
                <div className='message-body'>
                    {this.props.message}

                </div>

            </div>
        );
    }
}

// export default Message;

const mapStateToProps = (state) => {
    return {
        // customer_id: state.customer_id,
        // restaurant_id: state.restaurant_id,
        user_type: state.user_type,
        // jwtToken: state.jwtToken
    };
}

const mapDispatchToProps = (dispatch) => {
    return {


    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Message);