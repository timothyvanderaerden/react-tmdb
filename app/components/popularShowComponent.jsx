/**
 * Created by timothy on 23/11/16.
 */
import React from 'react';
import Store from '../store';
import {ImageUrl} from '../api/ApiUrl';
import {getPopularShows} from '../api/Discover';
import {Card, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {Row, Col} from 'react-flexbox-grid/lib/index'


export default class PopularShowComponent extends React.Component {
    componentWillMount() {
        this.state = { popularShows: null };

        getPopularShows().then(jsondata => {
            Store.dispatch({type: 'load_popularShows', data: jsondata});
        });

        this.unsubscribe = Store.subscribe(() => {
            this.setState({popularShows: Store.getState().popularShows});
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        var showList = [];
        if (this.state.popularShows) {
            for (let show of this.state.popularShows.results) {
                showList.push(show);
            }
        }

        return (
            <Row style={{margin: 8}}>
                {showList.map((show) => {
                    var image = `${ImageUrl}w500/${show.backdrop_path}`;
                    return (
                        <Col xs={12} sm={6} md={6} lg={4} key={show.id} style={{marginBottom: 12}}>
                            <Card>
                                <CardMedia>
                                    <img src={image}/>
                                </CardMedia>
                                <CardTitle
                                    title={show.original_name}
                                />
                                <CardText>
                                    {show.overview}
                                </CardText>
                            </Card>
                        </Col>
                    );
                }, this)}
            </Row>
        )
    }
}