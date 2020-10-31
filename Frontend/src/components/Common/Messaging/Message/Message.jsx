import React, { Component } from 'react';
import cookie from 'react-cookies';
import './Message.styles.css'
class Message extends Component {
    state = {}

    render() {
        const ifSender = this.props.user == cookie.load("user_type") ? 'isSender' : '';
        return (
            <div className={`message ${ifSender}`}>
                <div className='message-body'>
                    {this.props.message}

                </div>

            </div>
        );
    }
}

export default Message;