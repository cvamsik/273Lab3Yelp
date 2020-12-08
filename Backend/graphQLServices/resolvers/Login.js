const LoginCredentials = require('../../models/LoginCredentials')
const Customers = require('../../models/Customers')
const Restaurants = require('../../models/Restaurants')

module.exports.login = (args) => {
    console.log(args)
    LoginCredentials.findOne({ email_id: args.username }, (err, response) => {
        if (err) {
            console.log('User Not found' + err)
            return err;
        }
        else {
            // console.log(response)
            if (response.user_password === args.password) {
                // console.log("Inside first if")
                if (response.user_type == 1) {
                    Customers.findOne({ email_id: msg.body.username }, (err, res) => {
                        if (err) {
                            console.log('Error occured while fetching login details' + err)
                            return err;
                        }
                        else {
                            console.log('Customer')
                            let out = {
                                // _id: res._id,
                                user_type: response.user_type
                            }
                            // console.log(out)
                            return out;
                        }
                    })
                }
                else {
                    Restaurants.findOne({ email: args.username }, (err, res) => {
                        if (err) {
                            console.log('Error occured while fetching login details' + err)
                            return err;
                        }
                        else {
                            console.log("Restaurant")
                            let out = {
                                // _id: res._id,
                                user_type: response.user_type
                            }
                            console.log("In out" + JSON.stringify(out))
                            return out
                        }
                    })
                }
            }

        }

    })
}