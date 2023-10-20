const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const jsonwebtoken = require("jsonwebtoken");

const Account = require("./model/modelAccount");
const register = require("./routes/registerRoute");
const login = require("./routes/registerRoute");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose
    .connect("mongodb+srv://razvanpana20:m9h9myUBtwlVext3@cluster0.bspo0kt.mongodb.net/loginRegister")
    .then(() => {
        console.log("Successfully connected to the database!");
    })
    .catch((e) => {
        console.log("Something went wrong with DB connection: " + e.message);
    });

app.post("/api/login", login);
app.post("/api/register", register);

app.listen(port, () => {
    console.log(`Your server is listening on port ${port}`);
});
