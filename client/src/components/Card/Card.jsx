import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Card.scss';

function Card({data}) {

  const [genres, setGenres] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (data && data.genres && data.genres.length) {
      const genresArray = data.genres.map(el => {
        return el.name
      })
      setGenres(genresArray || []);
    }
  }, [data])

  if (!data) {
    return (
      <article style={{height: '335px'}} className="card-component">
        <div style={{backgroundColor: '#222'}} className='background skeleton-box'></div>
        <div className='info'>
          <h3 style={{backgroundColor: '#222', color: '#222', borderRadius: '30px', width: 'fit-content'}} className='skeleton-box'> Videogame Name</h3>
          <p style={{backgroundColor: '#222', color: '#222', borderRadius: '30px', width: 'fit-content'}} className='skeleton-box normal-text'>Videogame Genres</p>
        </div>
      </article>
    )
  }
  return (
    <article onClick={() => navigate(`/detail/${data.id}`)} className='card-component'>
      <div style={{backgroundImage: `url('${data.image || ''}')`}} className='background'></div>
      <div className='info'>
        <h3>{data.name || ''}</h3>
        <p className='normal-text'>{`Genres: ${genres && genres.length ? genres.join(', ') : 'No genres to show'}`}</p>
      </div>
    </article>
  )
}

export { Card };