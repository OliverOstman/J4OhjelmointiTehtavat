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

Tbody.propTypes = {
    picArray: PropTypes.array
};

export default Tbody;