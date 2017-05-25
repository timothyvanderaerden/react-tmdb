import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardText, CardTitle } from 'material-ui/Card';
import CastComponent from './castComponent';
import SimilarComponent from './similarComponent';

export default class SidebarComponent extends React.Component {
    render() {
        const { cast, similar } = this.props;

        return (
            <Card>
                <CardTitle title="Cast"/>
                <CardText>
                    <CastComponent cast={cast}/>
                </CardText>
                <CardTitle title="Similar"/>
                <CardText>
                    <SimilarComponent similarList={similar}/>
                </CardText>
            </Card>
        );
    }
}

SidebarComponent.propTypes = {
  cast: PropTypes.object.isRequired,
  similar: PropTypes.object.isRequired
};
