import React from 'react';
import Store from '../../store/store';
import {Link} from 'react-router';
import {ImageUrl} from '../../api/ApiUrl';
import {getPersonById, getCombinedCredits} from '../../api/People';
import PersonCardComponent from './personCardComponent';
import LoadingComponent from '../shared/loadingComponent';
import PosterComponent from '../shared/posterComponent';
import {Row, Col} from 'react-flexbox-grid';
import {Card, CardTitle} from 'material-ui/Card';

export default class PeopleComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const personId = this.props.params.personId;
        this.state = {personLoaded: false};
        Store.dispatch({type: 'APPBAR_TITLE', data: this.props.params.personName});

        this.getPersonData(personId);
    }

    getPersonData(personId) {
        Promise.all([
            getPersonById(personId),
            getCombinedCredits(personId)
        ]).then((data) => {
            let [ person, credits ] = data;
            this.setState({person: person});
            this.setState({credits: credits});
        }).then(() => {
            this.setState({personLoaded: true});
        })
    }

    render() {
        const {person, personLoaded, credits} = this.state;
        if (personLoaded) {
            return (
                <Row style={{margin: 8}}>
                    <Col xs={12} md={6}>
                        <PersonCardComponent person={person}/>
                    </Col>
                    <Col xs={12} md={6}>
                        <Card>
                            <CardTitle title="Known For"/>
                            <Row center="xs">
                                {credits.cast.map(credit => {
                                    const image = credit.poster_path ?
                                        `${ImageUrl}w154${credit.poster_path}` :
                                        '/app/resources/images/poster_avatar_placeholder.png';
                                    const link = credit.media_type === 'movie' ? 'movie' : 'tv';
                                    return (
                                        <Link to={`/${link}/${credit.id}/${credit.title}`}>
                                            <PosterComponent poster={image}
                                                             title={credit.title}
                                                             subtitle={credit.character}/>
                                        </Link>
                                    )
                                })}
                            </Row>
                        </Card>
                    </Col>
                </Row>
            )
        } else {
            return (
                <LoadingComponent/>
            )
        }
    }
}