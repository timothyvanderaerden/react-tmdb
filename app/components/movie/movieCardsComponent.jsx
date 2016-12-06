import React from 'react';
import {useRouterHistory} from 'react-router'
import {ImageUrl} from '../../api/ApiUrl';
import Chip from 'material-ui/Chip';
import {Card, CardMedia, CardTitle, CardText, CardActions} from 'material-ui/Card';
import {Row, Col} from 'react-flexbox-grid/lib/index';
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

    _handleClick = (id, name) => {
        history.push(`/movie/${id}/${name}`);
    };

    render() {
        const { movies, movieGenres } = this.props;

        return (
            <Row style={{margin: 8}}>
                {movies.results.map(movie => {
                    const image = `${ImageUrl}w500${movie.backdrop_path}`;
                    return (
                        <Col xs={12} sm={6} md={6} lg={4} key={movie.id} style={{marginBottom: 12}}>
                            <Card>
                                <CardMedia>
                                    {movie.backdrop_path ?
                                        <img src={image} style={{cursor: 'pointer'}}
                                             onClick={() => {
                                                 this._handleClick(movie.id, movie.original_title)
                                             }}/> : null
                                    }
                                </CardMedia>
                                <CardTitle title={movie.original_title} style={{cursor: 'pointer'}}
                                           onTouchTap={() => {
                                               this._handleClick(movie.id, movie.original_title)
                                           }}/>
                                <CardText>
                                    {movie.overview}
                                </CardText>
                                <CardActions>
                                    <div style={this.styles.wrapper}>
                                        {movie.genre_ids.map(id => {
                                            const genre = movieGenres.genres.find(x => x.id === id);
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
    }
}