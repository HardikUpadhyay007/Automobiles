const express = require("express");
const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());  // Enable CORS for all routes

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { checkUsrExist } = require('./existingUser.js');
const { connectionString } = require("./mongoURL.js");
mongoose.connect(connectionString);

const userSchema = new Schema({ // create Schema
    name: String,
    email: String,
    password: String,
    phone: Number
}); 
const User = mongoose.model('User', userSchema); // turn schema to model


const querySchema = new Schema({
    name: String,
    email: String,
    phone: Number,
    query: String
})

const Query = mongoose.model('Query', querySchema);



app.get("/", (req, res) => { // root endpoint
    res.json({
        "msg": "meow meow nigga"
    });
});

app.post("/signup", checkUsrExist, async (req, res) => { // signup endpoint
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password
    const phone = req.body.phone;

    const user = new User({ // creating user obj 
        name: name,
        email: email,
        password: password,
        phone: phone
    }) 

    await user.save(); //saved the newly created user

    res.json({                      // returning response
        "msg": "signup successful"
    })
})


app.post("/queryForm", async (req, res) => { //endpoint for queryForm
    const { name, email, phone, QueryMsg} = req.body;
    
    const query = new Query({
        name: name,
        email: email,
        phone: phone
    })

    await query.save();

    res.json({
        "msg": "query successful"
    })
});



app.listen(3000, () => {
    console.log("Server running on port: 3000");
});

