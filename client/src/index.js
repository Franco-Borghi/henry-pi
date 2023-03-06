import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './redux/store';
import { LandingPage } from './containers/LandingPage/LandingPage';
import { Home } from './containers/Home/Home';
import { VideogameDetail } from './containers/VideogameDetail/VideogameDetail';
import { Create } from './containers/Create/Create';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />}>
            <Route index element={<LandingPage />}/>
            <Route path='home' element={<Home />} />
            <Route path='detail/:id' element={<VideogameDetail />} />
            <Route path='create' element={<Create />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
