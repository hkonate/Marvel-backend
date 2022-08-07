const mongoose = require("mongoose")

const Favoris = mongoose.model("Favoris", {
    name: String,
    description: String,
    url_secure: String,
    code: String,
});

module.exports = Favoris;