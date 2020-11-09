import React, { Component } from 'react';
import Message from './Message/Message'
import './MessageContainer.styles.css'
// import ChatInput from './ChatInput/ChatInput'
import './ChatInput/ChatInput.styles.css';

import axios from 'axios';
import routeConstants from '../../../Config/routeConstants'
import { connect } from 'react-redux'

class MessageContainer extends Component {
    state = {
        messages: [],
        chatInput: "",
        conversationData: {

        },
        seconds: 0
    }

    tick = () => {
        this.setState({
            seconds: this.state.seconds + 1
        })
    }
    componentWillUnmount() {
        // clearInterval(this.interval);
    }


    componentDidMount = () => {
        // setInterval(() => this.tick(), 3000);
        axios.defaults.headers.common['Authorization'] = this.props.jwtToken;
        // console.log(this.props)
        axios.get(`${routeConstants.BACKEND_URL}/messages${routeConstants.GET_MESSAGES}`, {
            params: {
                conversation_id: this.props.conversation_id
            }
        }).then((res) => {
            // console.log(res)
            this.setState({ messages: [...res.data[0].messages], conversationData: { ...res.data[0] } })
        })
    }
    submitHandler = (e) => {
        e.preventDefault();
        console.log(this.props);
        axios.defaults.headers.common['Authorization'] = this.props.jwtToken;

        axios.post(`${routeConstants.BACKEND_URL}/messages${routeConstants.POST_MESSAGES}`, {
            message: this.state.chatInput,
            customer_id: this.props.customer_id,
            restaurant_id: this.props.restaurant_id,
            sender: this.props.user_type
        })
            .then((res) => {
                console.log(res)
                // axios.defaults.headers.common['Authorization'] = this.props.jwtToken;

                // axios.get(`${routeConstants.BACKEND_URL}/messages${routeConstants.GET_MESSAGES}`, {
                //     params: {
                //         restaurant_id: this.props.restaurant_id,
                //         customer_id: this.props.customer_id
                //     }
                // }).then((res) => {
                //     console.log(res)
                //     // this.setState({ messages: [...res.data[0].messages] })
                // }).catch((err) => {
                //     console.log("error loading" + err)
                // })

            }).catch((err) => {
                console.log("error loading" + err)
            })

    }
    inputChangeHandler = (e) => {
        const { value, name } = e.target;
        this.setState({ [name]: value });
    }
    render() {
        // console.log(this.state)
        let messages
        if (this.state.messages.length > 0) {
            messages = this.state.messages.map((message, i) => {
                return <Message key={i} message={message.message} user={message.sender} />
            })
        }
        let restDetails
        if (this.state.conversationData.restaurant_id) {
            restDetails = <div className="conversationDetails">
                <h4>Restaurant Name : {this.state.conversationData.restaurant_id.restaurant_name}</h4>
                {/* <h4>Customer Name : {this.state.conversationData.customer_id.customer_name}</h4> */}

            </div>
        }
        return (
            <div className="messagePage">
                {restDetails}
                <div className="message-container">

                    <div className="messages">
                        {messages}

                    </div>
                    <div>
                        <form className='chat-input' onSubmit={this.submitHandler}>
                            <input type='text' onChange={this.inputChangeHandler} value={this.state.chatInput} name="chatInput" placeholder="Enter message here" required />
                            <button className="btn-danger btn" type='submit'>Send</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

// export default MessageContainer;
const mapStateToProps = (state) => {
    return {
        customer_id: state.customer_id,
        order_id: state.order_id,
        restaurant_id: state.restaurant_id,
        user_type: state.user_type,
        conversation_id: state.conversation_id,
        jwtToken: state.jwtToken
    };
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageContainer);