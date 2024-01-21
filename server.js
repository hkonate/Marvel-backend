require("dotenv").config();
const axios = require("axios");
const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
mongoose.set("strictQuery", false)

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI);

const favorisRoutes = require("./routes/favoris");
app.use(favorisRoutes);

const usersRoutes = require("./routes/users");
app.use(usersRoutes);
s
app.get("/", (req, res) => {
  try {
    res.status(200).json({ message: "Welcome to the Marvel api !" });
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/comics", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.API_KEY}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/comics/:characterId", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${req.params.characterId}apiKey=${process.env.API_KEY}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/characters", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.API_KEY}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.log(error.message);
  }
});

app.get("*", (req, res) => {
  res.status(404).json({ message: "This route doesn't exist" });
});

app.listen(process.env.PORT || 3338, () => {
  console.log("Server live!!!!");
});
