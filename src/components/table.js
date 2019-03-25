import React from 'react';
import Tr from './tr';
import PropTypes from 'prop-types';

const Table = (props) => {
    const rows = props.picArray.map((item, i) => {
        return <Tr key={i} pic={item}/>;
    });
    return (
        <table>
            <tbody>
            {rows}
            </tbody>
        </table>
    );
};

Table.propTypes = {
    picArray: PropTypes.array,
};

export default Table;