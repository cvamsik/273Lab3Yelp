import React, { Component } from 'react';
import './ChatInput.styles.css';
import axios from 'axios';
import routeConstants from '../../../../Config/routeConstants'
import cookie from 'react-cookies'
class ChatInput extends Component {
    state = {
        chatInput: ""
    }
    submitHandler = (e) => {
        e.preventDefault();
        console.log("chat input submitted" + this.state.chatInput);
        axios.post(`${routeConstants.BACKEND_URL}/messages${routeConstants.POST_MESSAGES}`, {
            message: this.state.chatInput,
            customer_id: cookie.load('customer_id'),
            restaurant_id: cookie.load('restaurant_id'),
            sender: cookie.load('user_type')
        })
    }
    inputChangeHandler = (e) => {
        const { value, name } = e.target;
        this.setState({ [name]: value });
    }
    render() {
        return (
            <div>
                <form className='chat-input' onSubmit={this.submitHandler}>
                    <input type='text' onChange={this.inputChangeHandler} value={this.state.chatInput} name="chatInput" placeholder="Enter message here" required />
                    <button type='submit'>Send</button>
                </form>
            </div>);
    }
}

export default ChatInput;