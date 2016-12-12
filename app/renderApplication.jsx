import React from 'react';
import Store from './store/store';
import {render} from 'react-dom';
import {Router, Route, browserHistory, IndexRedirect} from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import IconUp from 'material-ui/svg-icons/navigation/expand-less';
import ScrollToTop from 'react-scroll-up';
import PopularComponent from './components/popular/popularComponent';
import UpcomingComponent from './components/upcoming/upcomingComponent';
import MovieComponent from './components/movie/movieComponent';
import SearchComponent from './components/search/searchComponent';
import TvShowComponent from './components/tv/tvShowComponent';
import PersonComponent from './components/person/personComponent';
import AppNavComponent from './components/navigation/appNavComponent';

class App extends React.Component {
    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <AppNavComponent />
                    <div>
                        {this.props.children}
                        <ScrollToTop showUnder={200}>
                            <FloatingActionButton>
                                <IconUp />
                            </FloatingActionButton>
                        </ScrollToTop>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

browserHistory.listen(location => Store.dispatch({type: 'ROUTER_LISTEN', data: location}));

const renderApplication = () => {
    render((
        <Router onUpdate={() => {window.scrollTo(0, 0)}} history={browserHistory}>
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
