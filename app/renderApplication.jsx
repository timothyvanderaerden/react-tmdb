import React from 'react';
import Store from './store';
import { render } from 'react-dom';
import { Router, Route, useRouterHistory, IndexRedirect } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PopularComponent from './components/popular/popularComponent';
import MovieComponent from './components/movie/movieComponent';
import TvShowComponent from './components/tv/tvShowComponent';
import AppNavComponent from './components/appNavComponent';
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
            <Route path="movie/:movieId/:movieName" component={MovieComponent}/>
            <Route path="tv/:tvShowId/:tvShowName" component={TvShowComponent}/>
        </Route>
    </Router>
    ),document.getElementById('applicatie'));
};

export default renderApplication;
