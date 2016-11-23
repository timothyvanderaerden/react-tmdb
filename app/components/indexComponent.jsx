import React from 'react';
import Store from '../store';
import {getPopularMovies} from '../api/Discover';
import {List, ListItem} from 'material-ui/List';
export default class IndexComponent extends React.Component {
    componentWillMount() {
        this.state = {popularMovies: null};
        getPopularMovies().then(jsondata => {
            Store.dispatch({type: 'load_popularMovies', data: jsondata});
        });

        this.unsubscribe = Store.subscribe(() => {
            this.setState({popularMovies: Store.getState().popularMovies});
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        var movieList = [];
        if (this.state.popularMovies) {
            for (let movie of this.state.popularMovies.results) {
                movieList.push(<ListItem key={movie.id} primaryText={movie.original_title}/>);
                //Added key: Each child in an array or iterator should have a unique "key" prop
                //https://facebook.github.io/react/docs/lists-and-keys.html
            }
        }
        return (
            <div>
                <List>
                    {movieList}
                </List>
            </div>
        )
    }
}
