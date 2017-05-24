import React from 'react';
// import { setRouterLocation } from './actions/routerActions';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AppNavComponent from './components/navigation/appNavComponent';
import PopularComponent from './components/popular/popularComponent';
import UpcomingComponent from './components/upcoming/upcomingComponent';
import MovieComponent from './components/movie/movieComponent';
import SearchComponent from './components/search/searchComponent';
import TvShowComponent from './components/tv/tvShowComponent';
import PersonComponent from './components/person/personComponent';

const renderApplication = () => (
  <Router history={history}>
    <div className="App">
      <AppNavComponent />
      <div className="container" style={{ margin: 0, width: '100vw'}}>
        <Switch>
          <Route exact path="/" component={PopularComponent} />
          <Route path="/popular" component={PopularComponent}/>
          <Route path="/upcoming" component={UpcomingComponent}/>
          <Route exact path="/movie/:movieId/:movieName" component={MovieComponent}/>
          <Route exact path="/tv/:tvShowId/:tvShowName" component={TvShowComponent}/>
          <Route exact path="/person/:personId/:personName" components={PersonComponent}/>
          <Route path="/search" component={SearchComponent}/>
        </Switch>
      </div>
    </div>
  </Router>
);

renderApplication.propTypes = {
  history: PropTypes.object.isRequired,
};

export default renderApplication;
