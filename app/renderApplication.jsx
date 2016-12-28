import React from 'react';
import Store from './store/store';
import {setRouterLocation} from './actions/routerActions';
import {render} from 'react-dom';
import {Router, Route, browserHistory, IndexRedirect} from 'react-router';
import App from './containers/app';
import PopularComponent from './components/popular/popularComponent';
import UpcomingComponent from './components/upcoming/upcomingComponent';
import MovieComponent from './components/movie/movieComponent';
import SearchComponent from './components/search/searchComponent';
import TvShowComponent from './components/tv/tvShowComponent';
import PersonComponent from './components/person/personComponent';

browserHistory.listen(location => Store.dispatch(setRouterLocation(location)));

const renderApplication = () => {
    render((
        <Router onUpdate={() => {
            window.scrollTo(0, 0)
        }} history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRedirect to='popular'/>
                <Route path="popular" component={PopularComponent}/>
                <Route path="upcoming" component={UpcomingComponent}/>
                <Route path="movie/:movieId/:movieName" component={MovieComponent}/>
                <Route path="tv/:tvShowId/:tvShowName" component={TvShowComponent}/>
                <Route path="person/:personId/:personName" components={PersonComponent}/>
                <Route path="search" component={SearchComponent}/>
            </Route>
        </Router>
    ), document.getElementById('applicatie'));
};

export default renderApplication;
