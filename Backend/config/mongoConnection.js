// const mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost/yelp", {
//     useMongoClient: true,
// });

// const mcon = mongoose.connection;
// mcon
//     .once("open", () => console.log("connected to db!!"))
//     .on("error", (error) => {
//         console.log("Error", error);
//     });
// module.exports = mcon;

const mongoose = require("mongoose");


const dbConfig = {
    mongoURL: process.env.MONGO_URL
}

mongoose.connect(dbConfig.mongoURL, { useNewUrlParser: true, useUnifiedTopology: true, poolSize: 5 })
    .then(() => console.log('MongoDB Connected'))
mongoose.Promise = global.Promise
let mongo = mongoose.connection
mongo.on('error', console.error.bind(console, 'MongoDB connection error:'))

module.exports = mongo



