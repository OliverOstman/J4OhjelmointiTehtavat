import React from 'react';
import Tr from './tr';
import PropTypes from 'prop-types';

const Tbody = (props) => {
    return (
        <tbody>
            <Tr picArray={props.picArray}/>
        </tbody>
    );
};

/*
class Tbody extends React.Component {
    render() {
        return this.props.picArray.map((prop) => (
            <tbody>
                <Tr picArray={prop}/>
            </tbody>
        ));
    }
}
*/
Tbody.propTypes = {
    picArray: PropTypes.array
};

export default Tbody;