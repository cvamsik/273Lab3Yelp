import React, { Component } from 'react';
import './ChatInput.styles.css';
import axios from 'axios';
import routeConstants from '../../../../Config/routeConstants'
import { connect } from 'react-redux';

class ChatInput extends Component {
    state = {
        chatInput: ""
    }
    submitHandler = (e) => {
        e.preventDefault();
        console.log("chat input submitted" + this.state.chatInput);
        axios.defaults.headers.common['authorization'] = this.props.jwtToken;

        axios.post(`${routeConstants.BACKEND_URL}/messages${routeConstants.POST_MESSAGES}`, {
            message: this.state.chatInput,
            customer_id: this.props.customer_id,
            restaurant_id: this.props.restaurant_id,
            sender: this.props.user_type
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
            </div>
        );
    }
}

// export default ChatInput;

const mapStateToProps = (state) => {
    return {
        customer_id: state.customer_id,
        restaurant_id: state.restaurant_id,
        user_type: state.user_type,
        jwtToken: state.jwtToken
    };
}

const mapDispatchToProps = (dispatch) => {
    return {


    }
}



export default connect(mapStateToProps, mapDispatchToProps)(ChatInput);