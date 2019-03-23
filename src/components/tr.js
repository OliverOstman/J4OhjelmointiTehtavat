import React from 'react';
import PropTypes from 'prop-types';

class Tr extends React.Component {
    render() {
        console.log(this.props);
        return this.props.picArray.map((prop) => (
                <tr>
                    <td>
                        <img src={"http://media.mw.metropolia.fi/wbma/uploads/" + prop.thumbnails.w160} alt={'No image'}></img>
                    </td>
                    <td>
                        <p>{prop.title}</p>
                        <p>{prop.description}</p>
                    </td>
                    <td>
                        <a href={"http://media.mw.metropolia.fi/wbma/uploads/" + prop.filename}>View</a>
                    </td>
                </tr>
        ));
    }
}

Tr.propTypes = {
    picArray: PropTypes.array
};

export default Tr;