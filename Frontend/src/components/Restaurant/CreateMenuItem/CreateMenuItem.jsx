import React, { Component } from 'react';
import Axios from 'axios';
import routeConstants from '../../../Config/routeConstants';
import cookie from 'react-cookies'
import { connect } from 'react-redux'
class CreateMenuItem extends Component {
    state = {
        description: "",
        dish_name: "",
        image_url: "",
        ingredients: "",
        menu_id: 0,
        price: 0,
        restaurant_id: this.props.restaurant_id

    }
    inputChangeHandler = (e) => {
        const { value, name } = e.target;
        this.setState({ [name]: value });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const postData = {
            ...this.state
        }
        console.log(postData)
        Axios.post(`${routeConstants.BACKEND_URL}/restaurant${routeConstants.POST_MENU_ITEM}`, postData).then((res) => {
            console.log(res);
            window.alert("Created Successfully");
        }).catch((err) => {
            console.log(err)
            window.alert("Unable to create");
        })
    }



    onFileUpload = e => {
        e.preventDefault();
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
                `${routeConstants.BACKEND_URL}/images${routeConstants.POST_IMAGE_MENU_ITEM}`,
                // {
                //     file: formData,
                //     customer_id: this.state.customer_id,
                //     customer_name: this.state.customer_name
                // }
                formData
            )
            .then(response => {
                this.setState({ image_url: response.data })
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
        let profileURL = `${routeConstants.BACKEND_URL}${this.state.image_url}`
        return (<div className="menuItem">

            <form className="formData">
                <div className="profile">
                    <div >
                        <div className="imageDiv">
                            <img src={profileURL} width='130px' height='130px' alt="DishImage" className="imageCont" />
                            <input type="file" onChange={this.onFileChange} />
                            <button className="btn btn-danger" style={{ width: '100px' }} onClick={this.onFileUpload}>Upload!</button>
                            {this.fileData()}
                        </div>
                    </div>
                    <div class="form-group col-md-2">
                        <label >Name</label>
                        <input type="text" onChange={this.inputChangeHandler} className="form-control" name="dish_name" value={this.state.dish_name} />
                    </div>
                    <div class="form-group col-md-5">
                        <label >Description</label>
                        <input onChange={this.inputChangeHandler} type="text" className="form-control" name="description" value={this.state.description} />
                    </div>
                    <div class="form-group col-md-2">
                        <label >Ingredients</label>
                        <input type="text" onChange={this.inputChangeHandler} className="form-control" name="ingredients" value={this.state.ingredients} />
                    </div>

                    <div class="form-group col-md-3">
                        <label>Price</label>
                        <input type="text" onChange={this.inputChangeHandler} className="form-control" name="price" value={this.state.price} />
                    </div>
                    <div class="form-group col-md-6">
                        <label >Category</label>
                        <select value={this.state.category_id} onChange={this.inputChangeHandler} selected={this.state.category_id} name="category_id" class="form-control" >
                            <option value="1">Desserts</option>
                            <option value="2">Salads</option>
                            <option value="3">Beverages</option>
                            <option value="4">Appetizers</option>
                            <option value="5">Main Course</option>

                        </select>
                    </div>
                </div>
                {/* </div> */}
                {/* <div class="form-row"> */}
                <div >
                    <button type="submit" onClick={this.handleSubmit} class="btn btn-danger">Create Dish</button>
                </div>
                {/* <div class="form-group col-md-2">
                    <button type="reset" class="btn btn-danger">Cancel Edit</button>
                </div> */}
                {/* </div> */}

            </form>
        </div >);
    }
}

// export default CreateMenuItem;

const mapStateToProps = (state) => {
    return {
        restaurant_id: state.restaurant_id
    };
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateMenuItem);