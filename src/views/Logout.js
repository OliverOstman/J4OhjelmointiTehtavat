import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Logout extends Component {

    componentDidMount() {
        this.props.setUser(null);
        localStorage.removeItem('token');
        this.props.history.push('/');
    }

    render() {
        return (
            <React.Fragment>
                <h1>Logout</h1>
            </React.Fragment>
        );
    }
}

Logout.propTypes = {
    setUser: PropTypes.func,
    history: PropTypes.object,
};

export default Logout;