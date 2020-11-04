import React, { Component } from 'react';
import './MessageCard.styles.css'
// import { Link } from "react-router-dom";
// import Menu from '../../../Restaurant/Menu/Menu';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux'
import { setConversationID } from '../../../../reduxConfig/Common/CommonActions'

// import { Redirect } from "react-router-dom";

class MessageCard extends Component {
    state = {
        redirect: false
    }

    handleClick = () => {
        console.log(this.props);
        // localStorage.setItem('order_id', this.props.props.res.order_id)
        this.props.setConversationID({
            conversation_id: this.props.data._id
        })
        this.props.history.push('/restaurant/messages/conversation')
    }
    render() {
        console.log(this.props)

        const restData = { ...this.props.data }
        let displayName
        if (restData) {
            if (this.props.user_type === 2) {
                displayName = <h5>
                    Customer :{restData.customer_id.customer_name}
                </h5>
            }
            else {
                displayName = <h5>
                    Restaurant :{restData.restaurant_id.restaurant_name}
                </h5>
            }
        }
        return (<div>
            {/* {JSON.stringify(this.props.props)} */}
            <div className="MessageCard">

                <h5>
                    Conversation ID: {restData.conversation_id}
                </h5>
                {displayName}

                <button className='btn btn-danger buttonRed' onClick={this.handleClick}>Message</button>
            </div>

        </div>);
    }
}

// export default RestaurantCard;
// export default withRouter(OrderCard);

const mapStateToProps = (state) => {
    return {
        customer_id: state.customer_id,
        conversation_id: state.order_id,
        restaurant_id: state.restaurant_id,
        user_type: state.user_type
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setConversationID: (conversation_id) => dispatch(setConversationID(conversation_id))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MessageCard));