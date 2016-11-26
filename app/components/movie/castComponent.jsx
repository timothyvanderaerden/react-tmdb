import React from 'react';
import Store from '../../store';
import {getCastForMovie} from '../../api/Movies';
import {ImageUrl} from '../../api/ApiUrl';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import CircularProgress from 'material-ui/CircularProgress';
import {Row, Col} from 'react-flexbox-grid';

export default class CastComponent extends React.Component {
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
        this.state = {cast: null};

        getCastForMovie(this.props.id).then(jsondata => {
            Store.dispatch({type: 'load_cast', data: jsondata});
        });

        this.unsubscribe = Store.subscribe(() => {
            this.setState({cast: Store.getState().cast});
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        if (this.state.cast) {
            const cast = this.state.cast;

            return (
                <div style={this.styles.wrapper}>
                    {cast.cast.map((credit) => {
                        const image = `${ImageUrl}w45${credit.profile_path}`;
                        return (
                            <Chip key={credit.id} style={this.styles.chip}>
                                {credit.profile_path ? <Avatar src={image}/> : null}
                                {credit.name}
                            </Chip>
                        )
                    })}
                </div>
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