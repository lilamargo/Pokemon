const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const pokemonRoute = require("./pokemon.js");
const tipoRoute = require("./tipo.js");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/pokemon", pokemonRoute);
router.use("/tipo", tipoRoute);

module.exports = router;
