import React from 'react';
import PropTypes from 'prop-types';

/*
class Tr extends React.Component {
    render() {
        return this.props.picArray.map((prop) => (
           <p>{ prop.description }</p>
        ));
    }
}
*/

class Tr extends React.Component {
    render() {
        return (
            <td>
                <img src={this.props.picArray.thumbnails.w160}></img>
                <p>{this.props.picArray.title}</p>
                <p>{this.props.picArray.description}</p>
                <a href={this.props.picArray.filename}>View</a>
            </td>
        )
    }
}

Tr.propTypes = {
    picArray: PropTypes.array
};

export default Tr;