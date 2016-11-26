import React from 'react';
import Store from '../../store';
import {getMovieReviews} from '../../api/Movies';
import {Card, CardText, CardTitle, CardHeader} from 'material-ui/Card';
import CircularProgress from 'material-ui/CircularProgress';
import {Row, Col} from 'react-flexbox-grid';

export default class ReviewComponent extends React.Component {
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
        this.state = {reviews: null};

        getMovieReviews(this.props.id).then(jsondata => {
            Store.dispatch({type: 'load_reviews', data: jsondata});
        });

        this.unsubscribe = Store.subscribe(() => {
            this.setState({reviews: Store.getState().reviews});
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        if (this.state.reviews) {
            const reviews = this.state.reviews.results;

            return (
                <Card style={{marginBottom: 8}}>
                    <CardHeader title="Reviews"/>
                    {reviews.map((review) => {
                        return (
                            <div key={review.id}>
                                <CardTitle title={review.author}/>
                                <CardText>
                                    <p>{(review.content.substr(0, 500)).concat('...')}</p>
                                    <p>
                                        Read more at <a href={review.url}>{review.author}</a>
                                    </p>
                                </CardText>
                            </div>
                        )
                    })}
                </Card>
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