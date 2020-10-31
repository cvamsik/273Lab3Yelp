import React, { Component } from "react";
import CustomInput from "../../Common/CustomInput/CustomInput";
import axios from "axios";
import "./CustomerProfile.styles.css";
import CustomButton from "../../Common/CustomButton/CustomButton";
import { Route } from "react-router";
import cookie from 'react-cookies';
import routeConstants from "../../../Config/routeConstants";
class UserProfile extends Component {
    state = {
        customer_id: 0,
        customer_name: "",
        birthday: "",
        about: "",
        contact_number: "",
        userType: "1",
        things_loved: "",
        find_me: "",
        blog_ref: "",
        selected_file: null,
        img: null,
        email_id: "",
        MODIFIED: "",
        image_path: "",
        disabled: true,
        editstate: false,
        oldDetails: {},
    };

    handleChange = (e) => {
        //e.preventDefault();
        const { value, name } = e.target;
        this.setState({ [name]: value });
        // console.log(this.state);
    };

    componentWillMount() {

        // console.log("in edit profile")
        let body;
        // console.log(cookie.load("email"));
        axios.get(`${routeConstants.BACKEND_URL}/customer${routeConstants.GET_CUSTOMER_PROFILE}`,
            {
                params: {
                    email_id: cookie.load("email")
                }
            }).then((res) => {

                // console.log(this.state);
                this.setState({ oldDetails: { ...res.data }, ...res.data }, () => {
                    console.log(res.data);
                });


            })




        // fetch(`${routeConstants.BACKEND_URL}/imageData/TestImage.jpg`)
        // .then((res) => {
        //     this.setState({ img: res }, () => {
        //         console.log(this.state)
        //     })
        // }).catch((err) => {
        //     console.log(err)
        // })
        // let outside;
        // fetch(`${routeConstants.BACKEND_URL}/imageData/TestImage.jpg`)
        //     .then(response => response.blob())
        //     .then(images => {
        //         // Then create a local URL for that image and print it 
        //         outside = URL.createObjectURL(images)
        //         this.setState({ img: outside })
        //         // console.log(outside)
        //     })

    }

    handleEdit = (e) => {
        e.preventDefault();

        this.setState((prevstate) => ({
            editstate: !prevstate.editstate,
            disabled: !prevstate.disabled,
        }));
    };
    handleCancelEdit = (e) => {
        e.preventDefault();
        if (!this.state.editstate) {
            this.setState((prevstate) => ({
                // ADDRESS: { ...prevstate.oldData.ADDRESS },
                ...prevstate.oldData,
            }));
        }
    };
    handleSave = (e) => {
        e.preventDefault();
        const {
            disabled,
            editstate,
            oldDetails,
            ...userDetails
        } = this.state;


        const req = {
            ...userDetails,
        };
        // console.log(req)
        axios
            .put(`${routeConstants.BACKEND_URL}/customer${routeConstants.UPDATE_CUSTOMER_PROFILE}`, req)
            .then((res) => {
                console.log(res)
                if (res.status === 200) {
                    window.alert("Changes Updated Successfully");
                }
            }).catch((err) => {
                window.alert("Unable to update changes");
            });
    };



    onFileUpload = e => {
        // e.preventDefault();
        // console.log(this.state)
        //  this.setState({ projectId: this.props.match.params.projectId })
        let formData = new FormData();

        formData.append("file", this.state.selectedFile);
        formData.append('customer_id', this.state.customer_id)
        formData.append('customer_name', this.state.customer_name)
        formData.append('email_id', cookie.load('email'))

        // console.log(this.state)
        // console.log(JSON.stringify(formData.get("customer_id")))
        axios
            .post(
                `${routeConstants.BACKEND_URL}/images${routeConstants.POST_IMAGE_USER_PROFILE}`,
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

        // console.log(this.state)
        let profileURL = `${routeConstants.BACKEND_URL}${this.state.image_path}`
        return (

            <div className="profile">
                <div className="imageDiv">
                    <img src={profileURL} width='250px' height='250px' className="imageCont" />
                    <input type="file" onChange={this.onFileChange} id="fileinput" />
                    <button className="btn btn-danger" style={{ width: '100px' }} onClick={this.onFileUpload}>Upload!</button>
                    {this.fileData()}
                </div>

                <form className="userdetails" encType="multipart/form-data">
                    <h2>Edit Profile Details</h2>
                    <div className="option">
                        Name:{" "}
                        <input
                            label={this.state.oldDetails.customer_name}
                            disabled={this.state.disabled}
                            value={this.state.customer_name}
                            onChange={this.handleChange}
                            name="customer_name"
                        />
                    </div>
                    <div className="option">
                        Birthday:{" "}
                        <input
                            label={this.state.oldDetails.birthday}
                            disabled={this.state.disabled}
                            value={this.state.birthday.split('T')[0]}
                            onChange={this.handleChange}
                            name="birthday"
                            width="200px"
                        />
                    </div>
                    <div className="option">
                        Contact:{" "}
                        <input
                            label={this.state.oldDetails.contact_number}
                            disabled={this.state.disabled}
                            value={this.state.contact_number}
                            onChange={this.handleChange}
                            name="contact_number"
                            id="contact"
                        />
                    </div>
                    <div className="option">
                        Email: <input disabled value={this.state.email_id} name="email_id" id="email_id" />
                    </div>
                    <div className="option">
                        Contact:{" "}
                        <input
                            label={this.state.oldDetails.contact_number}
                            disabled={this.state.disabled}
                            value={this.state.contact_number}
                            onChange={this.handleChange}
                            name="contact_number"
                        />
                    </div>

                    <div className="option">
                        About:{" "}
                        <input
                            label={this.state.oldDetails.about}
                            disabled={this.state.disabled}
                            value={this.state.about}
                            onChange={this.handleChange}
                            name="about"
                        />
                    </div>
                    <div className="option">
                        Things Loved:{" "}
                        <input
                            label={this.state.oldDetails.things_loved}
                            disabled={this.state.disabled}
                            value={this.state.things_loved}
                            onChange={this.handleChange}
                            name="things_loved"
                        />
                    </div>
                    <div className="option">
                        Find me @:{" "}
                        <input
                            label={this.state.oldDetails.find_me}
                            disabled={this.state.disabled}
                            value={this.state.find_me}
                            onChange={this.handleChange}
                            name="find_me"
                        />
                    </div>

                    <div className="option">
                        Blog References:{" "}
                        <input
                            label={this.state.oldDetails.blog_ref}
                            disabled={this.state.disabled}
                            value={this.state.blog_ref}
                            onChange={this.handleChange}
                            name="blog_ref"
                        />

                    </div>

                    {/* {addresschange} */}
                    <div className="option" style={{ justifyContent: "space-around", marginLeft: '20%' }}>
                        <button className="btn btn-danger" type="submit" onClick={this.handleEdit}>
                            Toggle Edit
              {/* {this.state.editstate ? "Cancel Edit" : "Edit Details"}{" "} */}
                        </button>
                        {/* <button type="submit" onClick={this.handleCancelEdit}>
              Restore Changes
              {this.state.editstate ? "Cancel Edit" : "Edit Details"}{" "}
            </button> */}
                        <br />
                        {/* </div>

          <div className="option"> */}
                        <button className="btn btn-danger" type="submit" onClick={this.handleSave}>
                            Save Changes
              {/* {this.state.editstate ? "Cancel Edit" : "Edit Details"}{" "} */}
                        </button>


                    </div>
                </form>
            </div >
        );
    }
}

export default UserProfile;
