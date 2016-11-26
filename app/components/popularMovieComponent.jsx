/**
 * Created by timothy on 23/11/16.
 */
import React from 'react';
import Store from '../store';
import { useRouterHistory } from 'react-router'
import {ImageUrl} from '../api/ApiUrl';
import {getPopularMovies} from '../api/Discover';
import {getMovieGenres} from '../api/Genres';
import Chip from 'material-ui/Chip';
import {Card, CardMedia, CardTitle, CardText, CardActions} from 'material-ui/Card';
import {Row, Col} from 'react-flexbox-grid/lib/index';
import CircularProgress from 'material-ui/CircularProgress';
import createHashHistory from 'history/lib/createHashHistory';
export const history = useRouterHistory(createHashHistory)({queryKey:false});


export default class PopularMovieComponent extends React.Component {
    constructor(props) {
        super(props);
        this.styles = {
            chip: {
                margin: 4,
            },
            wrapper: {
                display: 'flex',
                flexWrap: 'wrap',
            },
        };
    }

    componentWillMount() {
        this.state = {popularMovies: null, movieGenres: null};

        getPopularMovies().then(jsondata => {
            Store.dispatch({type: 'load_popularMovies', data: jsondata});
        });

        getMovieGenres().then(jsondata => {
            Store.dispatch({type: 'load_movieGenres', data: jsondata});
        });

        this.unsubscribe = Store.subscribe(() => {
            this.setState({popularMovies: Store.getState().popularMovies,
                movieGenres: Store.getState().movieGenres});
        });

    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    handleLinkToMovie(id) {
        history.push(`/movie/${id}`);
    }

    render() {
        if (this.state.popularMovies && this.state.movieGenres) {
            const movieList = this.state.popularMovies.results;
            const genreList = this.state.movieGenres.genres;

            return (
                <Row style={{margin: 8}}>
                    {movieList.map((movie) => {
                        const image = `${ImageUrl}w500/${movie.backdrop_path}`;
                        return (
                            <Col xs={12} sm={6} md={6} lg={4} key={movie.id} style={{marginBottom: 12}}>
                                <Card>
                                    <CardMedia>
                                        <img src={image} style={{cursor: 'pointer'}}
                                             onClick={this.handleLinkToMovie.bind(this, movie.id)}/>
                                    </CardMedia>
                                    <CardTitle title={movie.original_title} style={{cursor: 'pointer'}}
                                               onClick={this.handleLinkToMovie.bind(this, movie.id)}/>
                                    <CardText>
                                        {movie.overview}
                                    </CardText>
                                    <CardActions>
                                        <div style={this.styles.wrapper}>
                                            {movie.genre_ids.map((id) => {
                                                const genre = genreList.find((x) => {
                                                    return x.id === id;
                                                });
                                                return (
                                                    <Chip key={id} style={this.styles.chip}>
                                                        {genre.name}
                                                    </Chip>
                                                );
                                            })}
                                        </div>
                                    </CardActions>
                                </Card>
                            </Col>
                        );
                    }, this)}
                </Row>
            )
        } else {
            return (
                <Row style={{margin: 8}}>
                    <Col xs={12}>
                        <Row center="xs">
                            <CircularProgress />
                        </Row>
                    </Col>
                </Row>
            )
        }
    }
}