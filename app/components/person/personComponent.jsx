import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { appBarActions } from '../../actions';
import { Link } from 'react-router-dom';
import { ImageUrl } from '../../api/ApiUrl';
import { getPersonById, getCombinedCredits } from '../../api/People';
import PersonCardComponent from './personCardComponent';
import LoadingComponent from '../shared/loadingComponent';
import PosterComponent from '../shared/posterComponent';
import { Row, Col } from 'react-flexbox-grid';
import { Card, CardTitle } from 'material-ui/Card';

class PersonComponent extends Component {
    componentWillMount() {
        const personId = this.props.match.params.personId;
        this.state = {personLoaded: false};
        this.props.actions.changeAppBarTitle(this.props.match.params.personName);

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
        });
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
                                    const type = credit.media_type === 'movie' ? 'movie' : 'tv';
                                    return (
                                        <Link key={type+credit.id} to={`/${type}/${credit.id}/${credit.title}`}>
                                            <PosterComponent poster={image}
                                                             title={type === 'movie' ? credit.title : credit.name}
                                                             subtitle={credit.character}/>
                                        </Link>
                                    );
                                })}
                            </Row>
                        </Card>
                    </Col>
                </Row>
            );
        } else {
            return (
                <LoadingComponent/>
            );
        }
    }
}

PersonComponent.propTypes = {
  actions: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(appBarActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonComponent);
