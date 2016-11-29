import React from 'react';
import Store from '../../store';
import {useRouterHistory} from 'react-router'
import {ImageUrl} from '../../api/ApiUrl';
import Chip from 'material-ui/Chip';
import {Card, CardMedia, CardTitle, CardText, CardActions} from 'material-ui/Card';
import {Row, Col} from 'react-flexbox-grid/lib/index';
import LoadingComponent from '../shared/loadingComponent';
import createHashHistory from 'history/lib/createHashHistory';
export const history = useRouterHistory(createHashHistory)({queryKey: false});

export default class MovieCardsComponent extends React.Component {
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
        this.state = {loaded: false};

        this.unsubscribe = Store.subscribe(() => {
            this.setState({
                loaded: Store.getState().loaded
            });
        });

    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    _handleClick = (id) => {
        history.push(`/movie/${id}`);
    };

    render() {
        if (this.state.loaded) {
            const movieList = this.props.movies.results;
            const genreList = this.props.movieGenres.genres;

            return (
                <Row style={{margin: 8}}>
                    {movieList.map(movie => {
                        const image = `${ImageUrl}w500${movie.backdrop_path}`;
                        return (
                            <Col xs={12} sm={6} md={6} lg={4} key={movie.id} style={{marginBottom: 12}}>
                                <Card>
                                    <CardMedia>
                                        {movie.backdrop_path ?
                                            <img src={image} style={{cursor: 'pointer'}}
                                                 onClick={() => {this._handleClick(movie.id)}} /> : null
                                        }
                                    </CardMedia>
                                    <CardTitle title={movie.original_title} style={{cursor: 'pointer'}}
                                               onClick={() => {this._handleClick(movie.id)}} />
                                    <CardText>
                                        {movie.overview}
                                    </CardText>
                                    <CardActions>
                                        <div style={this.styles.wrapper}>
                                            {movie.genre_ids.map(id => {
                                                const genre = genreList.find(x => x.id === id);
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
                    })}
                </Row>
            )
        } else {
            return (
                <LoadingComponent/>
            )
        }
    }
}