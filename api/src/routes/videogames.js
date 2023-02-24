const { Router } = require('express');
const axios = require('axios');
const { getAllVideogames, getVideogamesByName } = require('../middlewares/middleware');
const videogames = Router();
const { Genre, Videogame } = require('../db');


// videogames.get('/', async (req,res) => {
//   const name = req.query.name;
//   const videogames = await getAllVideogames();

//   if(name) {
//     const filteredVideogames = await videogames.filter(el => {
//       return el.name.toLowerCase().includes(name.toLowerCase());
//     })
//     filteredVideogames.length ?
//     res.status(200).send(filteredVideogames) :
//     res.status(404).send(`La búsqueda del videojuego ${name} no arrojó conincidencias`)
//   } else {
//     res.status(200).send(videogames)
//   }
// })

videogames.get('/', async (req,res) => {
  const name = req.query.name;

  if(name) {
    const filteredVideogames = await getVideogamesByName(name);
    filteredVideogames.length ?
    res.status(200).send(filteredVideogames) :
    res.status(404).send(`La búsqueda del videojuego ${name} no arrojó conincidencias`)
  } else {
    const videogames = await getAllVideogames();
    res.status(200).send(videogames)
  }
})

videogames.post('/', async (req,res) => {
  console.log(req.body)
  const {
    id,
    name,
    description,
    releaseDate,
    rating,
    platforms,
    createdInDb,
    genre
  } = req.body;

  let videogameCreated = await Videogame.create({
    id,
    name,
    description,
    releaseDate,
    rating,
    platforms,
    createdInDb
  })

  let genreDb = await Genre.findAll({
    where: { name: genre }
  })

  // let genresArray = genreDb.map(el => {
  //   return el.name;
  // })

  videogameCreated.addGenre(genreDb);

  res.status(200).send('Se creo un personaje nuevo');
})

module.exports = videogames;