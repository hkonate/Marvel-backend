const express = require("express");
const router = express.Router();

const Favoris = require("../models/Favoris");

router.post("/favoris/create", async (req, res) => {
  try {
    if (!req.body.description) {
      const { name, url_secure, code } = req.body;

      if (name && url_secure && code) {
        const newFavoris = new Favoris({
          name: name,
          url_secure: url_secure,
          code: code,
        });
        await newFavoris.save();
        res.status(200).json({
          name: newFavoris.name,
          url_secure: newFavoris.url_secure,
          code: newFavoris.code,
          _id: newFavoris._id,
        });
      }
    } else if (req.body.description) {
      const { name, url_secure, description, code } = req.body;

      if (name && url_secure && description && code) {
        const newFavoris = new Favoris({
          name: name,
          url_secure: url_secure,
          description: description,
          code: code,
        });
        await newFavoris.save();
        res.status(200).json({
          name: newFavoris.name,
          description: newFavoris.description,
          url_secure: newFavoris.url_secure,
          code: newFavoris.code,
          _id: newFavoris._id,
        });
      }
    } else {
      res.status(406).json({ message: "Missing Informations" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/favoris", async (req, res) => {
  try {
    const userFavoris = await Favoris.find();
    const count = userFavoris.length;
    res.status(200).json({
      count,
      userFavoris,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/favoris/delete/:id", async (req, res) => {
  try {
    if (req.params.id) {
      await Favoris.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Favoris removed" });
    } else {
      res.status(406).json({ message: "Misssing ID" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
