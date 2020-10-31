import React, { Component } from 'react';
import Message from './Message/Message'
import './MessageContainer.styles.css'
import ChatInput from './ChatInput/ChatInput'
import axios from 'axios';
import routeConstants from '../../../Config/routeConstants'
class MessageContainer extends Component {
    state = {
        messages: [
            { message: "hello", sender: 1 },
            { message: "HI", sender: 2 },
            { message: "hello1", sender: 1 },
            { message: "HI1", sender: 2 },
            { message: "hello2", sender: 1 },
            { message: "HI2", sender: 2 },
            { message: "hello2", sender: 1 },
            { message: "HI2", sender: 2 }, { message: "hello2", sender: 1 },
            { message: "HI2", sender: 2 }, { message: "hello2", sender: 1 },
            { message: "HI2", sender: 2 },

        ]
    }
    componentDidMount = () => {
        axios.get(`${routeConstants.BACKEND_URL}/messages${routeConstants.GET_MESSAGES_CUSTOMER}`, {
            restaurant_id: localStorage.getItem('restaurant_id'),
            customer_id: localStorage.getItem('customer_id')
        }).then((res) => {
            this.setState({ messages: res })
        })
    }
    render() {
        const messages = this.state.messages.map((message, i) => {
            return <Message key={i} message={message.message} user={message.sender} />
        })
        return (
            <div className="message-container">
                <div className="messages">
                    {messages}

                </div>
                <div>
                    <ChatInput />
                </div>
            </div>
        );
    }
}

export default MessageContainer;