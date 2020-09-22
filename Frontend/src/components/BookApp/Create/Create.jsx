import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';

class Create extends Component {
    state = {
        BookID: -1,
        Title: "",
        Author: "",
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
            BookID: this.state.BookID,
            Title: this.state.Title,
            Author: this.state.Author
        };
        console.log(postData);

        axios.defaults.withCredentials = true;
        axios.post('http://localhost:3001/create', postData).then((res, err) => {
            if (res.status === 200) {
                console.log(res);

                this.props.history.push('home');

            }
            else {
                console.log("Error" + err);
                window.alert("Could not create Book entry")

            }
        }).catch((err) => {
            console.log("Error" + err);
            this.setState({
                statusMessage: "Could not create book entry. Please re-check Book ID."
            })
            // window.alert("Could not create Book entry")
        })
    }
    render() {
        let redirectVar = null;
        if (!cookie.load('cookie')) {
            console.log("Redirecting the cookie")
            redirectVar = <Redirect to="/home" />
        }
        return (
            <div>
                {redirectVar}

                <br />
                <div class="container">
                    <form style={{ display: "flex", flexDirection: "column" }}>
                        <div style={{ width: "50%", float: "left" }} class="form-group">
                            <p >{this.state.statusMessage}</p>

                        </div>
                        <div style={{ width: '30%' }} class="form-group">
                            <input type="text" required class="form-control" name="BookID" onChange={this.handleInput} placeholder="Book ID" />
                        </div>
                        <br />
                        <div style={{ width: '30%' }} class="form-group">
                            <input type="text" required class="form-control" name="Title" onChange={this.handleInput} placeholder="Book Title" />
                        </div>
                        <br />
                        <div style={{ width: '30%' }} class="form-group">
                            <input type="text" required class="form-control" name="Author" onChange={this.handleInput} placeholder="Book Author" />
                        </div>
                        <br />
                        <div style={{ width: '30%' }}>
                            <button class="btn btn-success" type="button" onClick={this.handleSubmit}>Create</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Create;