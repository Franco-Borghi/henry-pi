export const GET_GENRES = 'GET_GENRES';
export const GET_VIDEOGAMES = 'GET_VIDEOGAMES';

export const getGenres = () => {
  return async function(dispatch) {

    const response = await fetch('http://localhost:3001/genres');
    
    if (!response.ok) {
      return console.error('Failed to fetch genres');
    }

    const genres = await response.json();

    dispatch({
      type: GET_GENRES,
      payload: genres
    })
  }
}

export const getVideogames = () => {
  return async function(dispatch) {

    const response = await fetch('http://localhost:3001/videogames');

    if (!response.ok) {
      return console.error('Failed to fetch videogames');
    }

    const videogames = await response.json();

    dispatch({
      type: GET_VIDEOGAMES,
      payload: videogames
    })
  }
}