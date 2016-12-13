import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import IconUp from 'material-ui/svg-icons/navigation/expand-less';
import ScrollToTop from 'react-scroll-up';
import AppNavComponent from '../components/navigation/appNavComponent';

export default class App extends React.Component {
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