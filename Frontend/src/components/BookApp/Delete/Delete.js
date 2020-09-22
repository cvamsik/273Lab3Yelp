import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';

class Delete extends Component {
    state = {
        BookID: -1,
        statusMessage: ""
    }
    handleInput = (e) => {
        const { name, value } = e.target;
        //console.log(e.target.value);
        this.setState({ [name]: value }, () => console.log(this.state))
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const postData = {
            BookID: this.state.BookID
        };
        //console.log(postData);

        axios.defaults.withCredentials = true;
        axios.post('http://localhost:3001/delete', postData).then((res, err) => {
            if (res.status === 200) {
                console.log(res);
                this.props.history.push('home');
            }
            else {
                console.log("Error" + err);
                window.alert("Could not delete Book entry")
            }
        }).catch((err) => {
            console.log("Error" + err);
            this.setState({
                statusMessage: "Could not delete book entry. Please re-check Book ID."
            })
            // window.alert("Could not delete Book entry")
        })
    }
    render() {
        let redirectVar = null;
        if (!cookie.load('cookie')) {
            console.log("Redirecting the cookie")
            redirectVar = <Redirect to="/home" />
        }
        return (
            <div class="container">
                {redirectVar}
                <form style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{ width: "50%", float: "left" }} class="form-group">
                        <p >{this.state.statusMessage}</p>

                    </div>
                    <div style={{ width: "50%", float: "left" }} class="form-group">
                        <input type="text" class="form-control" onChange={this.handleInput} name="BookID" placeholder="Search a Book by Book ID" />
                    </div>
                    <div style={{ width: "50%", float: "right" }}>
                        <button class="btn btn-success" onClick={this.handleSubmit} type="submit">Delete</button>
                    </div>

                </form>

            </div>
        )
    }
}

export default Delete;