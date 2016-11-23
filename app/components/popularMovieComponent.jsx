/**
 * Created by timothy on 23/11/16.
 */
import React from 'react';
import Store from '../store';
import {ImageUrl} from '../api/ApiUrl';
import {getPopularMovies} from '../api/Discover';
import {Card, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {Row, Col} from 'react-flexbox-grid/lib/index'


export default class PopularMovieComponent extends React.Component {
    componentWillMount() {
        this.state = { popularMovies: null };

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
                movieList.push(movie);
            }
        }

        return (
            <Row style={{margin: 8}}>
                {movieList.map((movie) => {
                    var image = `${ImageUrl}w500/${movie.backdrop_path}`;
                    return (
                        <Col xs={12} sm={6} md={6} lg={4} key={movie.id} style={{marginBottom: 12}}>
                            <Card>
                                <CardMedia>
                                    <img src={image}/>
                                </CardMedia>
                                <CardTitle
                                    title={movie.original_title}
                                >
                                </CardTitle>
                                <CardText>
                                    {movie.overview}
                                </CardText>

                            </Card>
                        </Col>
                    );
                }, this)}
            </Row>
        )
    }
}