import React from 'react';
import {ImageUrl} from '../../api/ApiUrl';
import {Card, CardText, CardTitle} from 'material-ui/Card';
import {Row, Col} from 'react-flexbox-grid';

export default class MovieCardComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {person} = this.props;
        const image = `${ImageUrl}w185${person.profile_path}`;

        return (
            <Card style={{marginBottom: 8}}>
                <CardText>
                    <Row>
                        <Col xs={12} md={4}>
                            <Row center="xs">
                                {person.profile_path ?
                                    <img src={image}/> : null
                                }
                            </Row>
                        </Col>
                        <Col xs={12} md={8}>
                            <CardTitle title={person.name}
                                       subtitle={person.biography}/>
                            <CardTitle title="Personal Info"/>
                            <CardText>
                                <p>
                                    <strong style={{display: 'block'}}>Birthday</strong>
                                    {person.birthday}
                                </p>
                                <p>
                                    <strong style={{display: 'block'}}>Place of birth</strong>
                                    {person.place_of_birth}
                                </p>
                                <p>
                                    <strong style={{display: 'block'}}>Homepage</strong>
                                    <a href={person.homepage}>Website</a>
                                </p>
                            </CardText>
                        </Col>
                    </Row>
                </CardText>
            </Card>
        )
    }
}