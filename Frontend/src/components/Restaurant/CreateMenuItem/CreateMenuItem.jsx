import React, { Component } from 'react';
import Axios from 'axios';
import { BACKEND_URL, POST_MENU_ITEM } from '../../../Config/routeConstants';
import cookie from 'react-cookies'

class CreateMenuItem extends Component {
    state = {
        description: "",
        dish_name: "",
        image_url: "",
        ingredients: "",
        menu_id: 0,
        price: 0,
        email: cookie.load('email')

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
        Axios.post(`${BACKEND_URL}/restaurant${POST_MENU_ITEM}`, postData).then((res) => {
            console.log(res);
            window.alert("Created Successfully");
        }).catch((err) => {
            console.log(err)
            window.alert("Unable to create");
        })
    }
    render() {
        return (<div className="menuItem">
            <form className="formData">
                <div className="profile">
                    <div >
                        <img src={this.state.image_url} alt="Dish Image" className="img-thumbnail" width='130px' height='100px' />
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

export default CreateMenuItem;