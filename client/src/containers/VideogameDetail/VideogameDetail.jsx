import React from 'react';
import { useParams } from 'react-router-dom';
import './VideogameDetail.scss';
import defaultImage from '../../../src/media/img/no-image.webp'

function VideogameDetail() {

  const [videogame, setVideogame] = React.useState(null);
  const [genres, setGenres] = React.useState([]);
  const { id } = useParams();

  React.useEffect(() => {
    
    const abortController = new AbortController();

    fetch(`http://localhost:3001/videogame/${id}`, { signal: abortController.signal })
    .then((response) => {
      if (!response.ok) {
        // throw Error('Failed to fetch videogame by id');
        return response.text();
      }
      return response.json();
    })
    .then((data) => {
      if (Array.isArray(data)) {
        setVideogame(data[0])
      }
      else setVideogame(data)
    })
    .catch(err => {
      if (!abortController.signal.aborted) {
        console.log(err);
        return null;
      }
    });

    return () => {
      abortController.abort()
    }
    
  }, [id])

  React.useEffect(() => {
    if (videogame && videogame.genres && videogame.genres.length) {
      const genresArray = videogame.genres.map(el => {
        return el.name
      })
      setGenres(genresArray || []);
      
    }
  }, [videogame])

  React.useEffect(() => {
    window.scrollTo(0,0)
  }, [])

  if (!videogame) {
    return (
      <div className="videogame-detail-container">
        <div style={{height: '870px'}} className="info">
          <div className='image skeleton-box'></div>
        </div>
      </div>
    )
  }

  return (
    <div className='videogame-detail-container'>
        <div className='info'>
          <img className='image' src={videogame.image || defaultImage} alt="videogame-cover" />
          <div className='details'>
            <h2>{videogame.name}</h2>
            <p className='normal-text genres'>{`Genres: ${genres && genres.length ? genres.join(', ') : 'No genres to show'}`}</p>
            <p className='platforms large-text'>{`Platforms: ${videogame.platforms.length ? videogame.platforms.map(element => (` ${element}`)) : 'can not find platforms for this game'}`}</p>
            {videogame.createdInDb ?
            <p className='description'>{videogame.description}</p>
            :
            <div className='description large-text' dangerouslySetInnerHTML={{__html: videogame.description}}></div>
            }
            <div className='rating-release'>
              <p className='rating normal-text'>{`Rating: ${videogame.rating}`}</p>
              <p className='release normal-text'>{`Release date: ${videogame.releaseDate}`}</p>
            </div>
          </div>
        </div>
    </div>
  )
}

export { VideogameDetail }