import React from 'react';
// import ImageGrid from '../components/ImageGrid';
import Table from '../components/table';
import PropTypes from 'prop-types';

const Home = (props) => {
    const {picArray} = props;
    return (
        <React.Fragment>
            {/* <ImageGrid picArray={picArray}/> <Table picArray={picArray}/> */}
            <Table picArray={picArray}/>
        </React.Fragment>
    );
};

Home.propTypes = {
    picArray: PropTypes.array,
};

export default Home;