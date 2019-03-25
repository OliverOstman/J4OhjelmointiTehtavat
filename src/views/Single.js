import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Single extends Component {
    mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';
    state = {
        file: {
            filename: 'b2db3cce51674aba84d9476a545c5cc4.jpg',
            title: 'Test',
        },
    };

    render() {
        return (
            <React.Fragment>
                <h1>{this.state.file.title}</h1>
                <img src={this.mediaUrl + this.state.file.filename}
                     alt={this.state.file.title}/>
            </React.Fragment>
        );
    }
}

Single.propTypes = {
    match: PropTypes.object,
};

export default Single;