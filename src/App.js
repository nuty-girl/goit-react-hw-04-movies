import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import HomePage from './pages/HomePage';
import MoviesPage from './pages/MoviesPage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import routes from './routes';

const App = () => (
  <BrowserRouter>
    <div className="App">
      <Navigation />

      <Switch>
        <Route exact path={routes.HOME} component={HomePage} />
        <Route path={routes.MOVIES_DETAILS} component={MovieDetailsPage} />
        <Route path={routes.MOVIES} component={MoviesPage} />
        <Redirect to="/" />
      </Switch>
    </div>
  </BrowserRouter>
);

export default App;
