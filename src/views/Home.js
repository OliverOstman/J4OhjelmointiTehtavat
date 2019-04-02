import React from 'react';
import Table from "../components/table";
import PropTypes from 'prop-types';

const Home = (props) => {
    return (
        <React.Fragment>
            <Table picArray={props.picArray}/>
        </React.Fragment>
    );
};

Home.propTypes = {
    picArray: PropTypes.array,
};

export default Home;