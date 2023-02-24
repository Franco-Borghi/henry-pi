import React from 'react';
import './Home.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getVideogames } from '../../redux/actions';
import { Card } from '../../components/Card/Card';
import { SearchBar } from '../../components/SearchBar/SearchBar';

function Home() {

  const dispatch = useDispatch();
  const videogames = useSelector(state => state.videogames);
  const [renderVideogames, setRenderVideogames] = React.useState({
    allVideogames: null,
    pages: []
  });
  const [pagination, setPagination] = React.useState([]);
  const [index, setIndex] = React.useState(0);
  const [searchValue, setSearchValue] = React.useState('');

  const createArrayOfArrays = (arr) => {
    let newArray = [...arr];
    const length = Math.ceil(arr.length / 15);
    const emptyArray = new Array(length);
    for (let i = 0; i < emptyArray.length; i++) {
      emptyArray[i] = new Array(0);
    }

    let index = 0;

    newArray.forEach((el) => {
      if (emptyArray[index].length === 15) {
        index = index + 1;
        emptyArray[index].push(el);
      } else {
        emptyArray[index].push(el);
      }
    })
    
    return emptyArray;
  }

  React.useEffect(() => {
    if (!videogames) {
      dispatch(getVideogames());
    }

    if (renderVideogames.allVideogames && renderVideogames.allVideogames.length > 15) {
      const arr = Array.from({length: Math.ceil(renderVideogames.allVideogames.length / 15)});
      setPagination(arr);
    } else {
      setPagination([]);
    }
  }, [videogames, dispatch, renderVideogames])

  React.useEffect(() => {
    if (!searchValue && videogames) {
      setIndex(0);
      setRenderVideogames({
        allVideogames: videogames,
        pages: createArrayOfArrays(videogames)
      })
    }
    else if (searchValue) {
      setIndex(0);
      setRenderVideogames({
        allVideogames: null,
        pages: []
      });
      const abortController = new AbortController();

      fetch(`http://localhost:3001/videogames?name=${searchValue}`, { signal: abortController.signal })
      .then((response) => {
        if (!response.ok) {
          throw Error('Failed to fetch videogame by name');
        }
        return response.json();
      })
      .then((data) => {
        setIndex(0);
        setRenderVideogames({
        allVideogames: data,
        pages: createArrayOfArrays(data)
        });
      })
      .catch(err => {
        if (!abortController.signal.aborted) {
          setIndex(0);
          setRenderVideogames({
            allVideogames: videogames,
            pages: createArrayOfArrays(videogames)
          });
          alert(`Cant find videogames named ${searchValue}`)
        }
      });

      return () => {
        abortController.abort()
      }
    }
  }, [searchValue, videogames])

  return (
    <div className='home-container'>
      <SearchBar
      setSearchValue = {setSearchValue} 
      />
      <div className='pagination'>
        {
          pagination.length ?
          pagination.map((el, i) => (
            <p onClick={() => setIndex(i)} key={i}>{i+1}</p>
          ))
          :
          null
        }
      </div>
      <div className='cards'>
        {
          renderVideogames.pages.length ?
          renderVideogames.pages[index].map(el => (
            <Card
            key={el.id}
            data={el}
            />
          )) : 
          <>
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </>
        }
      </div>
    </div>
  )
}

export { Home };