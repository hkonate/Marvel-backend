require('dotenv').config();
const axios = require('axios');
const express = require('express')
const cors = require('cors');
const app = express()
const cloudinary = require("cloudinary").v2;
app.use(cors())
app.use(express.json())
const mongoose = require("mongoose")

mongoose.connect(process.env.MONGODB_URI)
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY_DB,
    api_secret: process.env.API_SECRET,
})




// const favorisRoutes = require("./routes/favoris")
// app.use(favorisRoutes)

// const usersRoutes = require("./routes/users")
// app.use(usersRoutes)

app.get("/", (req, res) => {
    try {
        console.log('dodo');
        res.status(200).json({ message: "Welcome to the Marvel api !" })
    } catch (error) {
        console.log(error.message);
    }
})

app.get("/comics", async (req, res) => {
    try {
        const response = await axios.get(`https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.API_KEY}&skip=${req.query.skip}`);
        res.status(200).json(response.data);
    } catch (error) {
        console.log(error.message);
    }
})


app.get("/comics/:characterId", async (req, res) => {
    try {
        const response = await axios.get(`https://lereacteur-marvel-api.herokuapp.com/comics/${req.params.characterId}apiKey=${process.env.API_KEY}`);
        res.status(200).json(response.data);
    } catch (error) {
        console.log(error.message);
    }
})

app.get("/characters", async (req, res) => {
    try {
        const response = await axios.get(`https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.API_KEY}&skip=${req.query.skip}`);
        res.status(200).json(response.data)
    } catch (error) {
        console.log(error.message);
    }
})

app.get("/character/:characterId", async (req, res) => {
    try {

    } catch (error) {

    }
})

app.get("*", (req, res) => {
    console.log("route not found");
    res.status(404).json({ message: "This route doesn't exist" })
})

app.listen(process.env.PORT || 3000, () => {
    console.log("Server live!!!!");
})


