import React from 'react';
import Store from '../../store';
import {ImageUrl} from '../../api/ApiUrl';
import {Row} from 'react-flexbox-grid/lib/index';
import {Card, CardMedia} from 'material-ui/Card';

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
            return (
                <Row style={{margin: 8}} center="xs">
                    {movies.map(movie => {
                        const image = `${ImageUrl}w154${movie.poster_path}`;
                        return (
                            <Card style={{width: 154, margin: 4}}>
                                <CardMedia>
                                    <img src={image}/>
                                </CardMedia>
                            </Card>
                        )
                    })}
                </Row>
            )
        } else {
            return null
        }
    }
}