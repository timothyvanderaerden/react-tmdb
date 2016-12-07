import React from 'react';
import Store from '../../store';
import {ImageUrl} from '../../api/ApiUrl';
import {Row} from 'react-flexbox-grid/lib/index';
import {Card, CardMedia} from 'material-ui/Card';
import Subheader from 'material-ui/Subheader';
import PosterComponent from '../shared/posterComponent';

export default class SearchComponent extends React.Component {
    componentWillMount() {
        this.state = {searchResult: null};

        this.unsubscribe = Store.subscribe(() => {
            this.setState({
                searchResult: Store.getState().searchResult,
            });
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const {searchResult} = this.state;
        if (searchResult) {
            const movies = searchResult.results.filter(x => x.media_type === 'movie' && x.poster_path !== null);
            const tvShows = searchResult.results.filter(x => x.media_type === 'tv' && x.poster_path !== null);
            return (
                <div style={{margin: 8}}>
                    {movies ?
                        <div>
                            <Subheader>Movies</Subheader>
                            <Row center="xs">
                                {movies.map(movie => {
                                    const image = `${ImageUrl}w154${movie.poster_path}`;
                                    return (
                                        <PosterComponent poster={image}/>
                                    )
                                })}
                            </Row>
                        </div>
                        : null
                    }
                    {tvShows ?
                        <div>
                            <Subheader>TV Shows</Subheader>
                            <Row center="xs">
                                {tvShows.map(show => {
                                    const image = `${ImageUrl}w154${show.poster_path}`;
                                    return (
                                        <PosterComponent poster={image}/>
                                    )
                                })}
                            </Row>
                        </div>
                        : null
                    }
                </div>
            )
        } else {
            return null
        }
    }
}