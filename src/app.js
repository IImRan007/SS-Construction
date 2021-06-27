const express = require('express');
require("./db/conn");
const app = express();
const path = require("path");
const hbs = require("hbs");
const User = require("./models/usermessage");
const port = process.env.PORT || 3000;

// setting the path
const staticpath = path.join(__dirname, "../public");
const templatepath = path.join(__dirname, "../templates/views");
const partialpath = path.join(__dirname, "../templates/partials");

// Middleware
app.use("/css", express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css")));
app.use("/js", express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js")));
app.use("/jq", express.static(path.join(__dirname, "../node_modules/jquery/dist")));

app.use(express.urlencoded({ extended: false }));
app.use(express.static(staticpath));
app.set("view engine", "hbs");
app.set("views", templatepath);
hbs.registerPartials(partialpath);

// Routing
app.get("/", (req, res) => {
    res.render("index");
});

// for adding multiple pages
// app.get("/contact", (req, res) => {
//     res.render("contact");
// });

app.post("/contact", async (req, res) => {
    try {
        // res.send(req.body);
        const userData = new User(req.body);
        await userData.save();
        res.status(201).render("index");
    } catch (error) {
        res.status(500).send(error);
    }
});

// Creating Server
app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});