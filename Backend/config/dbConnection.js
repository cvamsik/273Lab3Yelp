// const Sequelize = require("sequelize");

// const sequelize = new Sequelize("yelp", "Vamsi", "Sakura", { host: "localhost", dialect: "mysql", operatorAliases: "false" })

// try {
//     sequelize.authenticate();
//     console.log('Connection has been established successfully.');
// } catch (error) {
//     console.error('Unable to connect to the database:', error);
// }


// module.exports = sequelize;

var mysql = require('mysql2');

var con = mysql.createConnection({
    host: "localhost",
    user: "Vamsi",
    password: "Sakura",
    database: "yelp"
});

con.connect(function (err) {
    if (err) throw err;
    console.log('Connected to DB!');
});

module.exports = con;