import React from 'react';
import Store from '../../store';
import {ImageUrl} from '../../api/ApiUrl';
import {getSimilarMovies} from '../../api/Movies';
import {GridList, GridTile} from 'material-ui/GridList';
import CircularProgress from 'material-ui/CircularProgress';
import {Row, Col} from 'react-flexbox-grid';

export default class SimilarComponent extends React.Component {
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
        this.state = {similar: null};

        getSimilarMovies(this.props.id).then(jsondata => {
            Store.dispatch({type: 'load_similar', data: jsondata});
        });

        this.unsubscribe = Store.subscribe(() => {
            this.setState({similar: Store.getState().similar});
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        if (this.state.similar) {
            const similarList = this.state.similar.results;

            return (
                <GridList>
                    {similarList.map((similar) => {
                        const image = `${ImageUrl}w300${similar.backdrop_path}`;
                        return (
                        <GridTile
                            key={similar.id}
                            title={similar.original_title}
                        >
                            {similar.backdrop_path ? <img src={image}/> : null}
                        </GridTile>
                        )
                    })}
                </GridList>
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