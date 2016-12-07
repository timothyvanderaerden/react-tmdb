import React from 'react';
import {ImageUrl} from '../../api/ApiUrl';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';

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

    render() {
        const { cast } = this.props;

        return (
            <div style={this.styles.wrapper}>
                {cast.cast.map(credit => {
                    const image = credit.profile_path ?
                        `${ImageUrl}w45${credit.profile_path}` :
                        '/app/resources/images/profile_avatar_placeholder.png';
                    return (
                        <Chip key={credit.id} style={this.styles.chip}>
                            <Avatar src={image}/>
                            {credit.name}
                        </Chip>
                    )
                })}
            </div>
        )
    }
}