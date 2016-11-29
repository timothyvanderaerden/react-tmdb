import React from 'react';
import { render } from 'react-dom';
import { Router, Route, useRouterHistory, IndexRedirect } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PopularComponent from './components/popular/popularComponent';
import MovieComponent from './components/movie/mainComponent';
import TvShowComponent from './components/tv/mainComponent';
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

const renderApplication = () => {
    render((
    <Router history={history}>
        <Route path="/" component={App}>
            <IndexRedirect to='popular'/>
            <Route path="popular" component={PopularComponent}/>
            <Route path="movie/:movieId" component={MovieComponent}/>
            <Route path="tv/:tvShowId" component={TvShowComponent}/>
        </Route>
    </Router>
    ),document.getElementById('applicatie'));
};

export default renderApplication;
