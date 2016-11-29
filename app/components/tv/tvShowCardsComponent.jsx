import React from 'react';
import Store from '../../store';
import {useRouterHistory} from 'react-router'
import {ImageUrl} from '../../api/ApiUrl';
import {Card, CardMedia, CardTitle, CardText, CardActions} from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import LoadingComponent from '../shared/loadingComponent';
import {Row, Col} from 'react-flexbox-grid';
import createHashHistory from 'history/lib/createHashHistory';
export const history = useRouterHistory(createHashHistory)({queryKey: false});

export default class TvShowCardsComponent extends React.Component {
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
        this.state = {popularShows: null, tvGenres: null, movieGenres: null, loaded: false};
        Store.dispatch({type: 'loading_state', data: this.state.loaded});

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
        history.push(`/tv/${id}`);
    };

    render() {
        if (this.state.loaded) {
            const showList = this.props.tvShows.results;
            const genreList = this.props.tvGenres.genres.concat(this.props.movieGenres.genres);

            return (
                <Row style={{margin: 8}}>
                    {showList.map(show => {
                        const image = `${ImageUrl}w500/${show.backdrop_path}`;
                        return (
                            <Col xs={12} sm={6} md={6} lg={4} key={show.id} style={{marginBottom: 12}}>
                                <Card>
                                    <CardMedia>
                                        {show.backdrop_path ?
                                            <img src={image} style={{cursor: 'pointer'}}
                                                 onClick={() => {this._handleClick(show.id)}} /> : null
                                        }
                                    </CardMedia>
                                    <CardTitle title={show.original_name} style={{cursor: 'pointer'}}
                                               onClick={() => {this._handleClick(show.id)}} />
                                    <CardText>
                                        {show.overview}
                                    </CardText>
                                    <CardActions>
                                        <div style={this.styles.wrapper}>
                                            {show.genre_ids.map(id => {
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