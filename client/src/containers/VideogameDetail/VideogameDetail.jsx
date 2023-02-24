import React from 'react';
import { useParams } from 'react-router-dom';
import './VideogameDetail.scss';

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
      console.log(data);
      setVideogame(data)
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

  if (!videogame) {
    return (
      <div className="videogame-detail-container">
        <div style={{height: '870px'}} className="info skeleton-box"></div>
      </div>
    )
  }

  return (
    <div className='videogame-detail-container'>
        <div className='info'>
          <img className='image' src={videogame.image} alt="image" />
          <div className='details'>
            <h2>{videogame.name}</h2>
            <p className='normal-text genres'>{`Genres: ${genres && genres.length ? genres.join(', ') : 'No genres to show'}`}</p>
            {videogame.createdInDb ?
            <p className='description'>{videogame.description}</p>
            :
            <div className='description large-text' dangerouslySetInnerHTML={{__html: videogame.description}}></div>
            }
            <p className='rating'>{`Rating: ${videogame.rating}`}</p>
          </div>
        </div>
    </div>
  )
}

export { VideogameDetail }