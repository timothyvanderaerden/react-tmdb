import React from 'react';
import Store from '../../store';
import {getKeywordsForMovie} from '../../api/Movies';
import Chip from 'material-ui/Chip';
import CircularProgress from 'material-ui/CircularProgress';
import {Row, Col} from 'react-flexbox-grid';

export default class KeywordComponent extends React.Component {
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
        this.state = {keywords: null};

        getKeywordsForMovie(this.props.id).then(jsondata => {
            Store.dispatch({type: 'load_keywords', data: jsondata});
        });

        this.unsubscribe = Store.subscribe(() => {
            this.setState({keywords: Store.getState().keywords,});
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        if (this.state.keywords) {
            const keywords = this.state.keywords;

            return (
                <div style={this.styles.wrapper}>
                    {keywords.keywords.map((keyword) => {
                        return (
                            <Chip key={keyword.id} style={this.styles.chip}>
                                {keyword.name}
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