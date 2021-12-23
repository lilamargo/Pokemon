const { Router } = require("express");
const router = Router();
const axios = require("axios");
const { Tipo } = require("../db.js");

router.get("/", async (req, res, next) => {
  try {
    let allTipos = await axios.get("https://pokeapi.co/api/v2/type");
    let todosTipos = allTipos.data.results;

    todosTipos.forEach((item) => {
      Tipo.findOrCreate({
        where: {
          name: item.name,
        },
      });
    });
    const tiposDb = await Tipo.findAll();
    res.send(tiposDb);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
