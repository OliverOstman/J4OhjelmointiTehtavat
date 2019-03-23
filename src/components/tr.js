import React from 'react';
import PropTypes from 'prop-types';

class Tr extends React.Component {
    render() {
        return this.props.picArray.map((prop) => (
                <tr>
                    <td>
                        <img src={prop} alt={'No image'}></img>
                    </td>
                    <td>
                        <p>{prop.title}</p>
                        <p>{prop.description}</p>
                    </td>
                    <td>
                        <a href={prop.filename}>View</a>
                    </td>
                </tr>
        ));
    }
}

Tr.propTypes = {
    picArray: PropTypes.array
};

export default Tr;