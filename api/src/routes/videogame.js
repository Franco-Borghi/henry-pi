const { Router } = require('express');
const { getVideogame, getDbVideogame } = require('../middlewares/middleware');

const videogame = Router();

videogame.get('/:id', async (req,res) => {
  const { id } = req.params;
  const videogame = await getVideogame(id);
  const dbVideogame = await getDbVideogame(id);
  if (videogame || dbVideogame) {
    res.status(200).send(videogame || dbVideogame);
  } else {
    res.status(404).send(`Searching for the game with id: ${id} returned no matches`)
  }
  
})

module.exports = videogame;