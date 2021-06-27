const mongoose = require("mongoose");

// Creating a database
mongoose.connect("mongodb://localhost:127.0.0.1:27017/construction_website", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("connection successfull");
}).catch((error) => {
    console.log(error);
});