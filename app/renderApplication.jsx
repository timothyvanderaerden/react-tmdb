import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import IconUp from 'material-ui/svg-icons/navigation/expand-less';
import ScrollToTop from 'react-scroll-up';

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
      <div className="container" style={{ margin: 0, width: '100%'}}>
        <Switch>
          <Route exact path="/" component={PopularComponent} />
          <Route path="/popular" component={PopularComponent}/>
          <Route path="/upcoming" component={UpcomingComponent}/>
          <Route exact path="/movie/:movieId/:movieName" component={MovieComponent}/>
          <Route exact path="/tv/:tvShowId/:tvShowName" component={TvShowComponent}/>
          <Route exact path="/person/:personId/:personName" components={PersonComponent}/>
          <Route path="/search" component={SearchComponent}/>
        </Switch>
        <ScrollToTop showUnder={200}>
          <FloatingActionButton>
            <IconUp />
          </FloatingActionButton>
        </ScrollToTop>
      </div>
    </div>
  </Router>
);

renderApplication.propTypes = {
  history: PropTypes.object.isRequired,
};

export default renderApplication;
