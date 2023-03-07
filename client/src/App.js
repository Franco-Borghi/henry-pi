import './App.scss';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getGenres, getVideogames } from './redux/actions';
import { Nav } from './components/Nav/Nav';

function App() {

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getGenres());
    dispatch(getVideogames());
  }, [dispatch])

  return (
    <section className="app">
      <Nav />
      <Outlet></Outlet>
    </section>
  );
}

export default App;
