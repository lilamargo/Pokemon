const { Router } = require('express');
const router = Router();
const axios = require ('axios');
const { Tipo } = require('../db.js')

router.get('/', async (req, res, next) => {
  try {
    const allTipos = await axios.get('https://pokeapi.co/api/v2/type')

    allTipos.data.results.forEach((item)  => {
      Tipo.findOrCreate({
        where: {
          name: item.name
        }
      })
    })
    const tiposDb = await Tipo.findAll();
    res.send(tiposDb);
  } catch (error) {
    next(error);
  }
});



module.exports = router;
