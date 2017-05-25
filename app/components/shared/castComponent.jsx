import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { ImageUrl } from '../../api/ApiUrl';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';

class CastComponent extends React.Component {
    constructor(props) {
        super(props);
        this.styles = {
            chip: {
                margin: 4,
                pointer: 'cursor'
            },
            wrapper: {
                display: 'flex',
                flexWrap: 'wrap',
            },
        };
    }

    _handleClick = (id, name) => {
      this.props.history.push(`/person/${id}/${name}`);
    };

    render() {
        const { cast } = this.props;

        return (
            <div style={this.styles.wrapper}>
                {cast.cast.map(credit => {
                    const image = credit.profile_path ?
                        `${ImageUrl}w45${credit.profile_path}` :
                        '/app/resources/images/profile_avatar_placeholder.png';
                    return (
                        <Chip key={`${credit.cast_id}${credit.id}`}
                              style={this.styles.chip}
                              onTouchTap={() => {
                                  this._handleClick(credit.id, credit.name);
                              }}>
                            <Avatar src={image}/>
                            {credit.name}
                        </Chip>
                    );
                })}
            </div>
        );
    }
}

CastComponent.propTypes = {
  cast: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default withRouter(CastComponent);
