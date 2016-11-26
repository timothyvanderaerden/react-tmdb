import React from 'react';
import {Card, CardText, CardTitle} from 'material-ui/Card';
import CastComponent from './castComponent';
import SimilarComponent from './similarComponent';

export default class SidebarComponent extends React.Component {
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

    render() {
        return (
            <Card>
                <CardTitle title="Cast"/>
                <CardText>
                    <CastComponent id={this.props.id}/>
                </CardText>
                <CardTitle title="Similar"/>
                <CardText>
                    <SimilarComponent id={this.props.id}/>
                </CardText>
            </Card>
        )
    }
}