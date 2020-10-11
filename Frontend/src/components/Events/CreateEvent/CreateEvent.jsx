import React, { Component } from 'react';
import './CreateEvent.styles.css'
import { Redirect, withRouter } from "react-router-dom";
import cookie from 'react-cookies';
import Axios from 'axios'
import routeConstants from '../../../Config/routeConstants'

class CreateEvent extends Component {
    state = {
        event_name: "",
        event_description: "",
        event_date: "",
        event_time: "",
        event_creator_id: "",
        event_latitude: "",
        event_longitude: "",
        event_hashtags: "",

    }

    inputChangeHandler = (e) => {
        const { value, name } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.props);
        // localStorage.setItem('event_id', this.props.props.res.event_id)
        if (cookie.load('cookie')) {
            const d = {
                email_id: cookie.load('email'),
                event_name: this.state.event_name,
                event_description: this.state.event_description,
                event_date: this.state.event_date,
                event_time: this.state.event_time,
                event_latitude: this.state.event_latitude,
                event_longitude: this.state.event_longitude,
                event_hashtags: this.state.event_hashtags,
            };

            Axios.post(`${routeConstants.BACKEND_URL}/events${routeConstants.POST_EVENT}`, d
            ).then((res) => {
                // this.setState({ resData: [...res.data] })
                console.log(res)
                window.alert("Created!")
            }).catch((err) => {
                window.alert("Couldn't Create!")
                console.log(err);

            })
        }
        else {
            window.alert("Login to Register")
            this.props.props.props.history.push('/login')
            // this.setState({ redirectA: true })
        }
    }
    onFileUpload = e => {
        // e.preventDefault();
        console.log(this.state)
        //  this.setState({ projectId: this.props.match.params.projectId })
        let formData = new FormData();

        formData.append("file", this.state.selectedFile);
        formData.append('customer_id', this.state.customer_id)
        formData.append('customer_name', this.state.customer_name)
        formData.append('email_id', cookie.load('email'))

        console.log(this.state)
        console.log(JSON.stringify(formData.get("customer_id")))
        Axios
            .post(
                `${routeConstants.BACKEND_URL}/images${routeConstants.POST_IMAGE_EVENT}`,
                // {
                //     file: formData,
                //     customer_id: this.state.customer_id,
                //     customer_name: this.state.customer_name
                // }
                formData
            )
            .then(response => {
                window.location.reload(false)
            });
    };


    fileData = () => {
        if (this.state.selectedFile) {
            return (
                <div>

                    <p>File Name: {this.state.selectedFile.name}</p>

                </div>
            );
        }
        // else {
        //     return (
        //         <div>
        //             <br />
        //             <p>Choose before Pressing the Upload button</p>
        //         </div>
        //     );
        // }
    };




    onFileChange = event => {

        this.setState({ selectedFile: event.target.files[0] });
        if (this.state.selectedFile) {
            this.setState({ app: this.state.selectedFile.name });
        }
    };
    render() {
        let profileURL = `${routeConstants.BACKEND_URL}${this.state.image_path}`

        return (<div className="cont">
            <h4>Create Event</h4>
            <form className="formData2" onSubmit={this.handleSubmit}>

                <div class="form-group1 ">
                    <label>Name</label>
                    <input onChange={this.inputChangeHandler} required type="text" id="event_name" class="form-control" name="event_name" value={this.state.event_name} /></div>
                <div class="form-group1 ">
                    <label>Description</label><input required onChange={this.inputChangeHandler} type="text" class="form-control" name="event_description" value={this.state.event_description} /></div>
                <div class="form-group1 ">
                    <label>Date</label><input required onChange={this.inputChangeHandler} type="date" class="form-control" name="event_date" value={this.state.event_date} /></div>
                <div class="form-group1 ">
                    <label>Time</label><input required onChange={this.inputChangeHandler} type="time" class="form-control" name="event_time" value={this.state.event_time} /></div>
                <div class="form-group1 ">
                    <label>Latitude</label><input required onChange={this.inputChangeHandler} type="text" class="form-control" name="event_latitude" value={this.state.event_latitude} /></div>
                <div class="form-group1 ">
                    <label>Longitude</label><input required onChange={this.inputChangeHandler} type="text" id="event_longitude" class="form-control" name="event_longitude" value={this.state.event_longitude} /></div>
                <div class="form-group1 ">
                    <label>Hashtags</label> <input required onChange={this.inputChangeHandler} type="text" class="form-control" name="event_hashtags" value={this.state.event_hashtags} /></div>
                <div class="form-group1 ">
                    <button type="submit" class="btn btn-danger form-control" style={{ marginTop: "20px", marginLeft: "10px" }} >Submit</button></div>

            </form>
        </div>);
    }
}

export default CreateEvent;
