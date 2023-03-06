import React from 'react';
import './Home.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getVideogames } from '../../redux/actions';
import { Card } from '../../components/Card/Card';
import { SearchBar } from '../../components/SearchBar/SearchBar';

function Home() {

  const dispatch = useDispatch();
  const videogames = useSelector(state => state.videogames);
  const genres = useSelector(state => state.genres);
  const [applyFiltersButton, setApplyFiltersButton] = React.useState(false)
  const [renderVideogames, setRenderVideogames] = React.useState({
    allVideogames: null,
    pages: []
  });
  const [pagination, setPagination] = React.useState([]);
  const [index, setIndex] = React.useState(0);
  const [nameOrderDirection, setNameOrderDirection] = React.useState(false);
  const [ratingOrderDirection, setRatingOrderDirection] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');
  const [filterBar, setFilterBar] = React.useState(false);
  const [filters, setFilters] = React.useState({
    genres: [],
    origin: null,
    order: {
      type: null,
    }
  })

  // const applyFilters = (games) => {

  //   // ORIGIN FILTER //
  //   let filteredGames = games;
  //   if (filters.origin === 'added') {
  //     filteredGames = games.filter(videogame => videogame.createdInDb);
  //   } else if (filters.origin === 'existing') {
  //     filteredGames = games.filter(videogame => !videogame.createdInDb);
  //   }
  
  //   // ORDER FILTER //
  //   if (filters.order.type === 'name') {
  //     filteredGames.sort(function(a, b) {
  //       let nameA = a.name.toUpperCase();
  //       let nameB = b.name.toUpperCase();
  //       if (nameA < nameB) {
  //         return -1;
  //       }
  //       if (nameA > nameB) {
  //         return 1;
  //       }
  //       return 0;
  //     });
  //     if (nameOrderDirection === false) {
  //       filteredGames.reverse();
  //     }
  //   } else if (filters.order.type === 'rating') {
  //     filteredGames.sort(function(a, b) {
  //       return a.rating - b.rating;
  //     });
  //     if (ratingOrderDirection === false) {
  //       filteredGames.reverse();
  //     }
  //   }
  
  //   // GENRES FILTER //
    
  //   if (filters.genres.length > 0) {
  //     filteredGames = filteredGames.filter(videogame => {
  //       const gameGenres = videogame.genres.map(genre => genre.name);
  //       return filters.genres.every(genre => gameGenres.includes(genre));
  //     });
  //   }
  
  //   return filteredGames;
  // } 

  const handlePagination = (el) => {
    const paginationItems = [...document.querySelectorAll('.pagination p')];
    console.log(paginationItems);
    paginationItems.forEach(element => {
      element.className = '';
    });

    el.className = 'active';
  }
  
  const applyFilters = (games) => {
    let filteredGames = [...games];
    
    // ORIGIN FILTER //
    if (filters.origin === 'added') {
      filteredGames = games.filter(videogame => videogame.createdInDb);
    } else if (filters.origin === 'existing') {
      filteredGames = games.filter(videogame => !videogame.createdInDb);
    }
  
    // GENRES FILTER //
    if (filters.genres.length > 0) {
      filteredGames = filteredGames.filter(videogame => {
        const gameGenres = videogame.genres.map(genre => genre.name);
        return filters.genres.every(genre => gameGenres.includes(genre));
      });
    }
  
    // ORDER FILTER //
    if (filters.order.type === 'name') {
      filteredGames.sort(function(a, b) {
        let nameA = a.name.toUpperCase();
        let nameB = b.name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
      if (nameOrderDirection === false) {
        filteredGames.reverse();
      }
    } else if (filters.order.type === 'rating') {
      filteredGames.sort(function(a, b) {
        return a.rating - b.rating;
      });
      if (ratingOrderDirection === false) {
        filteredGames.reverse();
      }
    }
    
    return filteredGames;
  }

  const clearFilters = () => {
    document.querySelectorAll('.filter-by-origin input').forEach((el) => {
      el.checked = false;
    })

    setNameOrderDirection(false);

    document.querySelectorAll('.order label input').forEach((el) => {
      el.checked = false;
    })

    setRatingOrderDirection(false);

    setFilters({
      genres: [],
      origin: null,
      order: {
        type: null,
      }
    })
  }

  const handleOriginFilter = (actualElement, filter) => {
    if (actualElement.tagName !== 'INPUT') {
      return null;
    }

    if (filters.origin === filter) {
      actualElement.checked = false;
      setFilters({...filters, origin: null});
      return null;
    }

    document.querySelectorAll('.filter-by-origin input').forEach((el) => {
      el.checked = false;
    })
    actualElement.checked = true;

    setFilters({...filters, origin: filter})
  }

  const handleOrderFilter = (actualElement, filter) => {
    if (actualElement.tagName !== 'INPUT') {
      return null;
    }

    if (filters.order.type === filter) {
      actualElement.checked = false;
      setFilters({
        ...filters,
        order: {
          ...filters.order,
          type: null,
        }
      })
      return null;
    }

    document.querySelectorAll('.order label input').forEach((el) => {
      el.checked = false;
    })

    console.log(actualElement);
    actualElement.checked = true;

    setFilters({
      ...filters,
      order: {
        ...filters.order,
        type: filter,
      }
    })
  }

  const handleGenresFilter = (genre) => {
    console.log(genre);

    const select = document.querySelector('.filter-by-genres select');
    select.value = 'Select your option';

    if(filters.genres.includes(genre)) {
      const newGenres = filters.genres.filter(el => {
        return el !== genre;
      })
      setFilters({
        ...filters,
        genres: [...newGenres]
      })
    } else {
      if (filters.genres.length >= 3) {
        return alert('You can only select 3 genres!')
      }
      setFilters({
        ...filters,
        genres: [...filters.genres, genre]
      })
    }
  }

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

      const filteredVideogames = applyFilters(videogames);

      filteredVideogames.length ?
      setRenderVideogames({
        allVideogames: filteredVideogames,
        pages: createArrayOfArrays(filteredVideogames)
      })
      :
      setRenderVideogames({
        allVideogames: null,
        pages: [[null]]
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
        const filteredVideogames = applyFilters(data);

        filteredVideogames.length ?
        setRenderVideogames({
          allVideogames: filteredVideogames,
          pages: createArrayOfArrays(filteredVideogames)
        })
        :
        setRenderVideogames({
          allVideogames: null,
          pages: [[null]]
        })      
      })
      .catch(err => {
        if (!abortController.signal.aborted) {
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
  // }, [searchValue, videogames, filters.genres, filters.origin, filters.order.type, nameOrderDirection, ratingOrderDirection])
  }, [searchValue, videogames, applyFiltersButton])

  React.useEffect(() => {
    const paginationItems = [...document.querySelectorAll('.pagination p')];
    if (paginationItems.length && renderVideogames.pages.length) {
      handlePagination(paginationItems[index])
    }
  }, [index])

  React.useEffect(() => {
    window.scrollTo(0,0)
  }, [])

  return (
    <>
    <nav className={`filter-bar ${filterBar}`}>
      <ul>
        <li className='filter-by-genres'>
          <p>Filter by Genres:</p>
          <select onChange={(e) => handleGenresFilter(e.target.value)}>
            <option disabled selected>Select your option</option>
            {
              genres ?
              genres.map((el,i) => (
                <option key={i} value={`${el.name}`}>{el.name}</option>
              ))
              : null
            }
          </select>
          <div style={{ display: 'flex', gap: '10px'}}>
            { filters.genres.length ?
              filters.genres.map((el,i) => (
                <span onClick={() => handleGenresFilter(el)} className='normal-text genre-filter-tag' key={i}>{el}</span>
              ))
              : null
            }
          </div>
        </li>
        <li className='filter-by-origin'>
          <p>Filter by Origin:</p>
          <div className='label-container'>
            <label onClick={(e) => handleOriginFilter(e.target, 'added')}>
              <input type="checkbox" />
              <span>Added by me</span>
            </label>
          </div>
          <div className='label-container'>
            <label onClick={(e) => {handleOriginFilter(e.target, 'existing')}}>
              <input type="checkbox" />
              <span>Existing</span>
            </label>
          </div>
        </li>
        <li className='order'>
          <p>Order by:</p>
          <div className='label-container'>
            <label onClick={(e) => {handleOrderFilter(e.target, 'name')}}>
              <input type="checkbox" />
              <span>Name</span>
            </label>
            <svg onClick={() => setNameOrderDirection(!nameOrderDirection)} className={`${nameOrderDirection}`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 7V17" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 13L12 17L8 13" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className='label-container'>
            <label onClick={(e) => handleOrderFilter(e.target, 'rating')}>
              <input type="checkbox" />
              <span>Rating</span>
            </label>
            <svg onClick={() => setRatingOrderDirection(!ratingOrderDirection)} className={`${ratingOrderDirection}`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 7V17" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 13L12 17L8 13" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </li>
      </ul>
      <div style={{opacity: videogames ? '1' : "0"}} className='close-button normal-text'>
        <span onClick={() => {videogames && setFilterBar(!filterBar)}}>{!filterBar ? 'Open Filters' : 'Close Filters'}</span>
        <div style={{display: 'flex', gap: "10px", opacity: filterBar ? '1' : "0"}}>
          <span onClick={() => setApplyFiltersButton(!applyFiltersButton)}>Apply Filters</span>
          <span style={{cursor: 'default'}}>|</span>
          <span onClick={() => {clearFilters(); setApplyFiltersButton(!applyFiltersButton)}}>Clear Filters</span>
        </div>
      </div>
    </nav>
    <div className='home-container'>
      <SearchBar
      setSearchValue = {setSearchValue} 
      />
      <div onClick={() => setSearchValue('')} className='lage-text all-videogames-button'>Show all videogames</div>
      <div className="filters-and-pagination">
        <div className='filters'>
          <p className='large-text' onClick={() => {videogames && setFilterBar(!filterBar)}}></p>
        </div>
        <div className='pagination'>
          {
            pagination.length ?
            pagination.map((el, i) => (
              <p className={i === 0 ? 'active' : ''} onClick={(e) => setIndex(i)} key={i}>{i+1}</p>
            ))
            :
            null
          }
        </div>
      </div>
      <div className='cards'>
        {
          renderVideogames.pages.length ?
          renderVideogames.pages[index].map(el => (
            el === null ?
            null
            :
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
    </>
  )
}

export { Home };