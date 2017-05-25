import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardText, CardTitle } from 'material-ui/Card';
import Divider from 'material-ui/Divider';

export default class ReviewComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { reviews } = this.props;
        return (
            <Card style={{marginBottom: 8}}>
                <CardTitle title="Reviews"/>
                {reviews.total_results === 0 ? <CardText>No reviews yet</CardText> : null}
                {reviews.results.map(review => {
                    return (
                        <div key={review.id}>
                            <CardTitle title={review.author}/>
                            <CardText>
                                <p>{(review.content.substr(0, 500)).concat('...')}</p>
                                <p>
                                    Read more at <a href={review.url}>{review.author}</a>
                                </p>
                            </CardText>
                            <Divider/>
                        </div>
                    );
                })}
            </Card>
        );
    }
}

ReviewComponent.propTypes = {
  reviews: PropTypes.object.isRequired
};
