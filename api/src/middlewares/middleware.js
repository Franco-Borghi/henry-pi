const axios = require('axios');
const {Videogame, Genre} = require('../db');
require('dotenv').config();
const { MY_API_KEY } = process.env;

const getApiVideogames = async () => {

  let finalArray = [];
  let index = 1;

  while (finalArray.length < 100) {
    
    let apiUrl = await axios.get(`https://api.rawg.io/api/games?key=${MY_API_KEY}&page=${index}`);
    let apiInfo = await apiUrl.data.results.map(el => {
      return {
        id: el.id,
        name: el.name,
        image: el.background_image,
        rating: el.rating,
        genres: el.genres.map(el => {
          return {
            name: el.name
          };
        })
      }
    })
    finalArray.push(...apiInfo);
    index = index + 1;
  }

  return finalArray;
}

const getDbVideogames = async () => {
  return await Videogame.findAll({
    include: {
      model: Genre,
      attributes: ['name'],
      through: {
        attributes: [],
      }
    }
  })
}

const getAllVideogames = async () => {
  const apiInfo = await getApiVideogames();
  const dbInfo = await getDbVideogames();
  const finalInfo = apiInfo.concat(dbInfo);
  return finalInfo;
}

const getVideogamesByName = async (name) => {
  let apiUrl = await axios.get(`https://api.rawg.io/api/games?key=${MY_API_KEY}&search=${name}`);
  let apiInfo = await apiUrl.data.results.filter(el => {
    return el.name.toLowerCase().includes(name.toLowerCase())
  })
  let apiInfoMatched = await apiInfo.map(el => {
    return {
      id: el.id,
      name: el.name,
      image: el.background_image,
      genres: el.genres.map(el => {
        return {name: el.name};
      }),
      releaseDate: el.released,
      rating: el.rating,
      platforms: el.platforms.map(el => {
        return el.platform.name;
      })
    }
  });
  const dbVideogames = await getDbVideogames();
  const filteredDbVideogames = dbVideogames.filter(el => {
    return el.name.toLowerCase().includes(name.toLowerCase());
  })

  if (filteredDbVideogames.length) {
    let finalArray = filteredDbVideogames.concat(apiInfoMatched);

    if (finalArray.length > 15) {
      return finalArray.slice(0, 15)
    } else return finalArray;

  } else {

    if (apiInfoMatched.length > 15) {
      return apiInfoMatched.slice(0, 15)
    } else return apiInfoMatched;

  }
}

const getApiGenres = async () => {
  let allGenres = await Genre.findAll();

  if (allGenres.length) {
    console.log('bdd ya creada');
    return allGenres;
  } else {
    console.log('creando bdd');
    const apiUrl = await axios.get(`https://api.rawg.io/api/genres?key=${MY_API_KEY}`);
    const apiGenres = await apiUrl.data.results.map(el => {
      return el.name
    })

    apiGenres.forEach(el => {
      Genre.findOrCreate({
        where: { name: el }
      })
    });

    allGenres = await Genre.findAll();
    return allGenres;
  }
}

const getVideogame = async (id) => {
  try {
    const apiUrl = await axios.get(`https://api.rawg.io/api/games/${id}?key=${MY_API_KEY}`);
    const apiInfo = await apiUrl.data;
    return {
      id: apiInfo.id,
      name: apiInfo.name,
      image: apiInfo.background_image,
      genres: apiInfo.genres.map(el => {
        return {name: el.name};
      }),
      description: apiInfo.description,
      releaseDate: apiInfo.released,
      rating: apiInfo.rating,
      platforms: apiInfo.platforms.map(el => {
        return el.platform.name;
      })
    }
  } catch (error) {
    return null;
  }
}

const getDbVideogame = async (id) => {
  const dbVideogames = await getDbVideogames();
  const filteredDbVideogames = dbVideogames.filter(el => {
    return el.id == id;
  })

  if (filteredDbVideogames && filteredDbVideogames.length) {
    return filteredDbVideogames;
  } else return null;
}

module.exports = {
  getAllVideogames,
  getVideogamesByName,
  getApiGenres,
  getVideogame,
  getDbVideogame
}

