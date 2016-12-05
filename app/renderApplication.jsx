import React from 'react';
import Store from './store';
import { render } from 'react-dom';
import { Router, Route, useRouterHistory, IndexRedirect } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import IconUp from 'material-ui/svg-icons/navigation/expand-less';
import ScrollToTop from 'react-scroll-up';
import PopularComponent from './components/popular/popularComponent';
import UpcomingComponent from './components/upcoming/upcomingComponent';
import MovieComponent from './components/movie/movieComponent';
import TvShowComponent from './components/tv/tvShowComponent';
import AppNavComponent from './components/navigation/appNavComponent';
import createHashHistory from 'history/lib/createHashHistory';
export const history = useRouterHistory(createHashHistory)({queryKey:false});

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

history.listen(location => Store.dispatch({type: 'react_router', data: location}));

const renderApplication = () => {
    render((
    <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
        <Route path="/" component={App}>
            <IndexRedirect to='popular'/>
            <Route path="popular" component={PopularComponent}/>
            <Route path="upcoming" component={UpcomingComponent}/>
            <Route path="movie/:movieId/:movieName" component={MovieComponent}/>
            <Route path="tv/:tvShowId/:tvShowName" component={TvShowComponent}/>
        </Route>
    </Router>
    ),document.getElementById('applicatie'));
};

export default renderApplication;
