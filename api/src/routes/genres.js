const { Router } = require('express');

const genres = Router();

const { getApiGenres } = require('../middlewares/middleware')

genres.get('/', async (req,res) => {
  const genres = await getApiGenres();
  if (genres.length) {
    res.status(200).send(genres);
  } else {
    res.status(404).send('Lo sentimos, no se encontraron Géneros');
  }
})

module.exports = genres;