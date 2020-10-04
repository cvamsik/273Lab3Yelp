import React, { Component } from "react";
import CustomInput from "../../Common/CustomInput/CustomInput";
import axios from "axios";
import RouteConstants from "../../../Config/routeConstants";
import "./CustomerProfile.styles.css";
import CustomButton from "../../Common/CustomButton/CustomButton";
import { Route } from "react-router";
import cookie from 'react-cookies';
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
        selected_file: {},

        MODIFIED: "",

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
    // handleAddressChange = (e) => {
    //     const { value, name } = e.target;
    //     this.setState((prevState) => ({
    //         ADDRESS: { ...prevState.ADDRESS, [name]: value },
    //     }));
    //     //console.log(this.state);
    // };
    componentWillMount() {

        console.log("in edit profile")
        let body;
        console.log(cookie.load("email"));
        axios.get(`${RouteConstants.BACKEND_URL}/customer${RouteConstants.GET_CUSTOMER_PROFILE}`,
            {
                params: {
                    email_id: cookie.load("email")
                }
            }).then((res) => {

                console.log(this.state);
                this.setState({ oldDetails: { ...res.data[0] }, ...res.data[0] }, () => {
                    console.log(this.state);
                });


            })

        // axios
        //   .get(
        //     `${Constants.BACKEND_SERVER}/users/getuser`,
        //     localStorage.getItem("userId")
        //   )
        //   .then((res) => {
        //     const body = res.body;
        //     if (body._id) {
        //       this.setState({
        //         ...body
        //       });

        //     } else {
        //       console.log("Error fetching user data");
        //     }
        //   });
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
        console.log(req)
        axios
            .put(`${RouteConstants.BACKEND_URL}/customer${RouteConstants.UPDATE_CUSTOMER_PROFILE}`, req)
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
        e.preventDefault();
        //  this.setState({ projectId: this.props.match.params.projectId })
        let formData = new FormData();
        formData.append("file", this.state.selectedFile);
        formData.append('customer_id', this.state.customer_id)
        formData.append('customer_name', this.state.customer_name)
        console.log(this.state)
        console.log(JSON.stringify(formData))
        axios
            .post(
                `${RouteConstants.BACKEND_URL}/customer${RouteConstants.POST_CUSTOMER_IMAGE}`,
                {
                    file: formData,
                    customer_id: this.state.customer_id,
                    customer_name: this.state.customer_name
                }
            )
            .then(response => {
                if (response.status === 201) {
                    window.alert("File Uploaded Successfully");
                } else {
                    console.log(response);
                }
            });
    };


    fileData = () => {
        if (this.state.selectedFile) {
            return (
                <div>
                    <p>File Details:</p>
                    <p>File Name: {this.state.selectedFile.name}</p>
                    <p>File Type: {this.state.selectedFile.type}</p>
                    <p>
                        Last Modified:{" "}
                        {this.state.selectedFile.lastModifiedDate.toDateString()}
                    </p>
                </div>
            );
        } else {
            return (
                <div>
                    <br />
                    <p>Choose before Pressing the Upload button</p>
                </div>
            );
        }
    };




    onFileChange = event => {
        //  event.preventDefault();

        // Update the state
        this.setState({ selectedFile: event.target.files[0] });
        if (this.state.selectedFile) {
            this.setState({ app: this.state.selectedFile.name });
        }
    };


    render() {
        // let addresschange
        // if (this.state.oldDetails.ADDRESS) {
        //     addresschange = <div className='addressOptions'>
        //         <div className="option">
        //             Street Address:{" "}
        //             <input
        //                 label={this.state.oldDetails.ADDRESS.STREET}
        //                 disabled={this.state.disabled}
        //                 value={this.state.ADDRESS.STREET}
        //                 onChange={this.handleAddressChange}
        //                 name="STREET"
        //             />
        //         </div>
        //         <div className="option">
        //             State:{" "}
        //             <input
        //                 label={this.state.oldDetails.ADDRESS.STATE}
        //                 disabled={this.state.disabled}
        //                 value={this.state.ADDRESS.STATE}
        //                 onChange={this.handleAddressChange}
        //                 name="STATE"
        //             />
        //         </div>
        //         <div className="option">
        //             Country:{" "}
        //             <input
        //                 //  label={this.state.oldDetails.ADDRESS.COUNTRY}
        //                 disabled={this.state.disabled}
        //                 value={this.state.ADDRESS.COUNTRY}
        //                 onChange={this.handleAddressChange}
        //                 name="COUNTRY"
        //             />
        //         </div>
        //         <div className="option">
        //             Zip Code:{" "}
        //             <input
        //                 // label={this.state.oldDetails.ADDRESS.PIN}
        //                 disabled={this.state.disabled}
        //                 value={this.state.ADDRESS.PIN}
        //                 onChange={this.handleAddressChange}
        //                 name="PIN"
        //             />
        //         </div>
        //     </div>

        // }
        return (

            <div className="profile">
                <form className="userdetails">
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
                        />
                    </div>
                    <div className="option">
                        Email: <input disabled value={this.state.email_id} name="email_id" />
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
                    <div className="option">
                        Profile Image:{" "}
                        {/* <input
                            label={this.state.oldDetails.blog_ref}
                            disabled={this.state.disabled}
                            value={this.state.blog_ref}
                            onChange={this.handleChange}
                            name="blog_ref"
                        /> */}
                        <input type="file" onChange={this.onFileChange} />

                        <button onClick={this.onFileUpload}>Upload!</button>
                    </div>
                    <div className="option">
                        {this.fileData()}
                    </div>
                    {/* {addresschange} */}
                    <div className="option" style={{ justifyContent: "space-around", marginLeft: '20%' }}>
                        <CustomButton type="submit" onClick={this.handleEdit}>
                            Edit Details
              {/* {this.state.editstate ? "Cancel Edit" : "Edit Details"}{" "} */}
                        </CustomButton>
                        {/* <button type="submit" onClick={this.handleCancelEdit}>
              Restore Changes
              {this.state.editstate ? "Cancel Edit" : "Edit Details"}{" "}
            </button> */}
                        <br />
                        {/* </div>

          <div className="option"> */}
                        <CustomButton type="submit" onClick={this.handleSave}>
                            Save Changes
              {/* {this.state.editstate ? "Cancel Edit" : "Edit Details"}{" "} */}
                        </CustomButton>


                    </div>
                </form>
            </div >
        );
    }
}

export default UserProfile;
