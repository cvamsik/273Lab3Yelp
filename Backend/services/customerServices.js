const con = require('../config/dbConnection');

// CREATE TABLE customer_primary_data
// (
//     customer_id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
//     customer_name varchar(255)NOT NULL,
//     customer_age int NOT NULL,
//     birthday DATE NOT NULL,
//     contact_number int NOT NULL,
//     email_id varchar(255) NOT NULL,
//     about varchar(550),
//     FOREIGN KEY (email_id) REFERENCES login_credentials(email_id)
// );


var sql = "INSERT INTO customer_primary_data (customer_name, customer_age, birthday, contact_number) VALUES ('Test User', 37, '2017-09-09',123435456)";
// con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("1 record inserted");
// });

// con.query("SELECT * FROM customer_primary_data", function (err, result, fields) {
//     if (err) throw err;
//     console.log(result);
// });


module.exports.getCustomers = (req, res) => {
    console.log("Inside Customer GET service");
    con.query("SELECT * FROM customer_primary_data", function (err, result, fields) {
        if (err) throw err;
        res.send(JSON.stringify(result));
        console.log(result);
    });

}