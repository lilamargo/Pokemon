const { Router } = require('express');
const router = Router();
const { Pokemon, Tipo } = require('../db.js');
const axios = require ('axios');
const { Op } = require('sequelize');

//<-----------------------OBTENER TODOS LOS POKEMON EN RUTA '/' O POR QUERY----------------------->

router.get('/', async (req, res, next) => {

let name = req.query.name;
name = name.toLowerCase();
  if(name){

    //OBTENER POKEMON DE API POR QUERY
    try{
      let normalizeApi = [];
      const nameApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      if(nameApi.data){
        normalizeApi.push({
          id: nameApi.data.id,
          name: nameApi.data.name,
          hp: nameApi.data.hp,
          attack: nameApi.data.attack,
          defense: nameApi.data.defense,
          speed: nameApi.data.speed,
          height: nameApi.data.height,
          weight: nameApi.data.weight,
          image: nameApi.data.sprites.versions['generation-v']['black-white'].animated.front_default,
          tipo: nameApi.data.types.map(t => {return {name: t.type.name}})
        })
      }
      res.send(normalizeApi)

    } catch {};


//OBTENER POMEMON DE BASE DE DATOS POR QUERY {name}
    try{
    let nameQuery = await Pokemon.findAll({
      include: {
        model: Tipo,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
      where: {
        name: {
          [Op.iLike]: '%' + name + '%',
        },
      },
      order: [['name', 'ASC']],
    });

  //NORMALIZAR TODOS LOS POKEMONES PARA QUE SOLO TRAIGA LOS DATA QUE QUEREMOS DE CADA POKEMON
  let normalizePokemonDb = [];
  normalizePokemonDb.push({
    id: nameQuery[0]?.dataValues.id,
    name: nameQuery[0]?.dataValues.name,
    attack: nameQuery[0]?.dataValues.attack,
    defense: nameQuery[0]?.dataValues.defense,
    speed: nameQuery[0]?.dataValues.speed,
    height: nameQuery[0]?.dataValues.height,
    weight: nameQuery[0]?.dataValues.weight,
    image: nameQuery[0]?.dataValues.image,
    tipo: nameQuery[0]?.dataValues.tipos
  })
res.send(normalizePokemonDb)

} catch {};



//OBTENER POKEMONES DE BASE DE DATOS
  }else {

      try{
      const include = await Pokemon.findAll({
        include: {
          model: Tipo,
          attributes: ["name"],
          through: {
            attributes: [],
          }
        }
      });

      //NORMALIZAR TODOS LOS POKEMONES PARA QUE SOLO TRAIGA LOS DATA QUE QUEREMOS DE CADA POKEMON
      let normalize = []
      for (var i = 0; i < include.length; i++) {
        normalize.push({
          id: include[i].dataValues.id,
          name: include[i].dataValues.name,
          hp: include[i].dataValues.hp,
          attack: include[i].dataValues.attack,
          defense: include[i].dataValues.defense,
          speed: include[i].dataValues.speed,
          height: include[i].dataValues.height,
          weight: include[i].dataValues.weight,
          image: include[i].dataValues.image,
          tipo: include[i].dataValues.tipos.map(n => n.name)
        })
      }

      //OBTENER TODOS LOS POKEMONES DE LA API
      let apiLink = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=40');
      apiLink = apiLink.data.results;
      let subrequest = apiLink.map(el => axios.get(el.url))
      let promesaCumplida = await Promise.all(subrequest)

      promesaCumplida = await promesaCumplida.map(poke => {
        return {
          id: poke.data.id,
          name: poke.data.name,
          hp: poke.data.stats[0].base_stat,
          attack: poke.data.stats[1].base_stat,
          defense: poke.data.stats[2].base_stat,
          speed: poke.data.stats[5].base_stat,
          height: poke.data.height,
          weight: poke.data.weight,
          image: poke.data.sprites.versions['generation-v']['black-white'].animated.front_default,
          tipo: poke.data.types.map(t => {return {name: t.type.name}})
        }
      })

      let allPokemons = [...normalize, ...promesaCumplida]
      res.send(allPokemons);

    } catch(error) {
      next(error)
    }
  }
});

//<------------------------------OBTENER TODOS LOS POKEMONS POR PARAMS {ID}----------------------------------------------->

//OBTENER POKEMON DE API POR PARAMS {ID}
router.get('/:id', async (req, res, next) => {
let id = req.params.id;
if(id.length < 5){
  try{
  let normalizedApiId = [];
  const idApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
  if(idApi.data){
  normalizedApiId.push({  id: idApi.data.id,
    name: idApi.data.name,
    hp: idApi.data.hp,
    attack: idApi.data.attack,
    defense: idApi.data.defense,
    speed: idApi.data.speed,
    height: idApi.data.height,
    weight: idApi.data.weight,
    image: idApi.data.sprites.versions['generation-v']['black-white'].animated.front_default,
    tipo: idApi.data.types.map(t => {return {name: t.type.name}})
  })
  }
  res.send(normalizedApiId)
} catch{};

//OBTENER POMEMON DE BASE DE DATOS POR PARAMS {ID}

} else {
  try{
    let idParams = await Pokemon.findOne({
      where: { id: id },
      include: {
        model: Tipo,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });

    console.log(idParams)
    let normalizePokemonIdDb = [];
    normalizePokemonIdDb.push({
      id: idParams?.dataValues.id,
      name: idParams?.dataValues.name,
      attack: idParams?.dataValues.attack,
      defense: idParams?.dataValues.defense,
      speed: idParams?.dataValues.speed,
      height: idParams?.dataValues.height,
      weight: idParams?.dataValues.weight,
      image: idParams?.dataValues.image,
      tipo: idParams?.dataValues.tipos
    })
    res.send(normalizePokemonIdDb)
  } catch(error) {
    next(error);
  }
}
});


 //<------------------------CREAR UN POKEMON EN LA BASE DE DATOS----------------------------------------------------------->

router.post('/', async (req, res, next) => {
  try {
    const {
      name,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      image,
      tipo
    } = req.body;
    let newPokemon = await Pokemon.create({
      name,
      image,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      image
    })

    let tipoFind = await Tipo.findAll({
      where: {name: tipo}
    })

    newPokemon.addTipo(tipoFind);
    res.send(newPokemon);

  } catch (error) {
    next(error)
  }
})

module.exports = router;
