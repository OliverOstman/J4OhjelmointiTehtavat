import React, {Component} from 'react';
import PropTypes from "prop-types";
import {getUserMedia} from "../utils/MediaAPI";
import ImageGrid from "../components/ImageGrid";

class MyFiles extends Component {
    state = {
        picArray: [],
    };

    updateImages = () => {
        getUserMedia(localStorage.getItem('token')).then((pics) => {
            this.setState({picArray: pics});
        })
};

    componentDidMount() {
        this.updateImages();
    }

    render() {
        return (
            <React.Fragment>
                <ImageGrid picArray={this.state.picArray}/>
            </React.Fragment>
        )
    }
}

MyFiles.propTypes = {
    picArray: PropTypes.array,
};

export default MyFiles;