import React from 'react';
import { render } from 'react-dom';
import { Router, Route, useRouterHistory, IndexRedirect } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IndexComponent from './components/indexComponent';
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
            <IndexRedirect to='index'/>
            <Route path="index" component={IndexComponent}/>
        </Route>
    </Router>
    ),document.getElementById('applicatie'));
};

export default renderApplication;
