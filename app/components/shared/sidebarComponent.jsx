import React from 'react';
import {Card, CardText, CardTitle} from 'material-ui/Card';
import CastComponent from './castComponent';
import SimilarComponent from './similarComponent';

export default class SidebarComponent extends React.Component {
    constructor(props) {
        super(props);
    }

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
                    <SimilarComponent similar={similar}/>
                </CardText>
            </Card>
        )
    }
}