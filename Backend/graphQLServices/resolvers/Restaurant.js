const mongoose = require("mongoose");
const Dish = require('../../models/Dish')
const Restaurants = require('../../models/Restaurants')
const DeliveryAddress = require('../../models/DeliveryAddress')
const Orders = require('../../models/Orders')
module.exports.createDish = (args) => {

    return new Promise((resolve, reject) => {
        const cat = ['Desserts', 'Salads', 'Beverages', 'Appetizers', 'Main Course']

        let id = mongoose.Types.ObjectId()

        let dish = new Dish({
            description: args.description,
            dish_name: args.dish_name,
            image_url: args.image_url,
            ingredients: args.ingredients,
            dish_id: id,
            price: args.price,
            description: args.description,
            category_id: cat[args.category_id - 1]
        })
        dish.save((err, res) => {
            if (err) {
                console.log("Unable to create Dish " + err);
                reject(err)
            }
            else {

                console.log(res)
                Restaurants.findOneAndUpdate({ _id: args.restaurant_id },
                    { $addToSet: { "dishes": res._id } },
                    (err, result) => {
                        if (err) {
                            console.log('Error occured while Creating Menu Items' + err)
                            reject(err)
                        }
                        else {
                            console.log('Created Menu Items' + result)
                            resolve(res);

                        }
                    }).catch((err) => {
                        console.log('Error occured while creating Menu Item' + err)
                        reject(err)
                    })
            }
        })

    })


}

module.exports.updateRestaurantProfile = (args) => {

    return new Promise((resolve, reject) => {
        let rest = {
            _id: args._id,
            restaurant_location: args.restaurant_location,
            restaurant_description: args.restaurant_description,
            restaurant_address: args.restaurant_address,
            address_city: args.address_city,
            address_state: args.address_state,
            address_postal_code: args.address_postal_code,
            address_latitude: args.address_latitude,
            address_longitude: args.address_longitude,
            primary_phone: args.primary_phone,
            secondary_phone: args.secondary_phone,
            open_time: args.open_time,
            close_time: args.close_time,
        }
        Restaurants.findOneAndUpdate({ _id: args._id }, { ...rest }, (err, result) => {
            if (err) {
                console.log('Error occured while updating restaurant profile' + err)
                reject(err)
            }
            else {
                console.log('Restaurant update profile' + result)
                resolve(result);
            }
        })
    })
}

module.exports.searchRestaurant = (args) => {
    return new Promise((resolve, reject) => {
        Restaurants.find({
            "$or": [
                { restaurant_name: { '$regex': `(?i)${args.search_string}` } },
                { restaurant_location: { '$regex': `(?i)${args.search_string}` } },
                { restaurant_address: { '$regex': `(?i)${args.search_string}` } },
                { restaurant_description: { '$regex': `(?i)${args.search_string}` } }
            ]
        }, (err, result) => {
            if (err) {
                console.log('Error occured while searching restaurants' + err)
                reject(err)
            }
            else {
                console.log('Restaurant Search results' + result)
                resolve(result)
            }
        })
    })
}

module.exports.restaurantCreateOrder = (args) => {
    return new Promise((resolve, reject) => {
        let orderTotal = 0
        let itemsList = [];
        // args.cart_items.map(async (cartItem) => {
        //     console.log(cartItem)
        //     let temp = new CartItem({
        //         dish_id: cartItem.dish_id,
        //         // dish_name
        //         count: cartItem.count
        //     })
        //     itemsList.push(temp)
        // })
        // let itemsList=
        itemsList = args.cart_items.split(',');
        // CartItem.insertMany(itemsList).then((result) => {
        // savedList = result
        console.log("Result" + itemsList)
        let deliveryAddress
        if (args.order_type === "Delivery") {
            console.log("testing")
            deliveryAddress = new DeliveryAddress({
                delivery_address: args.delivery_address,
                address_city: args.address_city,
                // address_state: args.address_state,
                address_postal_code: args.address_postal_code,
                address_latitude: args.address_latitude,
                address_longitude: args.address_longitude,
                primary_phone: args.primary_phone,
            })
            deliveryAddress.save().then((res) => {
                let oId = mongoose.Types.ObjectId()
                let date = new Date();
                let time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
                let order = new Orders({
                    order_id: oId,
                    customer_id: args.customer_id,
                    restaurant_id: args.restaurant_id,
                    payment_card_digits: args.payment_card_digits,
                    cart_items: itemsList,
                    order_type: args.order_type,
                    order_status: "Order Placed",
                    order_total_price: args.order_total_price,
                    order_time: time,
                    order_date: date,
                    delivery_address: deliveryAddress,
                    cart_items: itemsList
                })
                order.save().then((result) => {
                    console.log('Order Created' + result)
                    resolve(result)
                })
            }).catch((err) => {
                console.log('Error occured while creating Delivery -> Delivery' + err)
                reject(err)
            });
        }
        else {
            let oId = mongoose.Types.ObjectId()
            let date = new Date();
            let time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
            let order = new Orders({
                order_id: oId,
                customer_id: args.customer_id,
                restaurant_id: args.restaurant_id,
                payment_card_digits: args.payment_card_digits,
                cart_items: savedList,
                order_type: args.order_type,
                order_status: "Order Placed",
                order_total_price: args.order_total_price,
                order_time: time,
                order_date: date,
                delivery_address: deliveryAddress,
                cart_items: itemsList
            })
            order.save().then((result) => {
                console.log('Order Created' + result)
                resolve(result)
            }).catch((err) => {
                console.log('Error occured while creating Order -> Pickup' + err)
                reject(err)
            })
        }
        // }).catch((err) => {
        //     reject(err)
        // })
    })
}




module.exports.getOrdersRestaurant = (args) => {
    return new Promise((resolve, reject) => {
        Orders.find({ restaurant_id: args.restaurant_id }).sort('-order_date').exec(
            (err, result) => {
                if (err) {
                    console.log('Error occured while fetching Orders' + err)
                    reject(err)
                }
                else {
                    console.log('Orders fetched' + result)
                    resolve(result)
                }
            })
    })
}





module.exports.restaurantUpdateOrder = (args) => {
    return new Promise((resolve, reject) => {
        Orders.findOneAndUpdate({ _id: args.order_id }, { order_status: args.order_status_id }, (err, result) => {
            if (err) {
                console.log('Error occured while updating order' + err)
                reject(err)
            }
            else {
                console.log('Order updated' + result)
                resolve(result)
            }
        })
    })
}