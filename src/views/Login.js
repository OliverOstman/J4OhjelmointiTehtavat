import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {login, register, getUser} from '../utils/MediaAPI';

class Login extends Component {
    state = {
        username: '',
        password: '',
        email: '',
        full_name: '',
    };

    divStyle = {
        width: '50%',
    };

    mainStyle = {
        display: 'flex',
    };

    handleLoginSubmit = (evt) => {
        evt.preventDefault();
        console.log(evt.target[1].name);
        console.log(evt.target[1].value);
        this.setState({
            [evt.target[0].name]: evt.target[0].value,
            [evt.target[1].name]: evt.target[1].value,
        });
        setTimeout(() => {
            this.doLogin();
        }, 5);
    };

    handleRegisterSubmit = (evt) => {
        evt.preventDefault();
        this.setState({
            [evt.target[0].name]: evt.target[0].value,
            [evt.target[1].name]: evt.target[1].value,
            [evt.target[2].name]: evt.target[2].value,
            [evt.target[3].name]: evt.target[3].value,
        });
        register(this.state).then(user => {
            console.log(user);
            setTimeout(() => {
                this.doLogin();
            }, 5);
        });
    };

    doLogin = () => {
        login(this.state.username, this.state.password).then(response => {
            console.log(response);
            this.props.setUser(response.user);
            localStorage.setItem('token', response.token);
            this.props.history.push('/home');
        });
    };

    componentDidMount() {
        console.log(localStorage.getItem('token'));
        if (localStorage.getItem('token') !== null) {
            getUser(localStorage.getItem('token')).then(response => {
                this.props.setUser(response);
                this.props.history.push('/home');
            });
        }
    };

    render() {
        return (
            <div style={this.mainStyle}>
                <div style={this.divStyle}>
                    <h1>Login</h1>
                    <form onSubmit={this.handleLoginSubmit}>
                        Username: <br/>
                        <input type='text' name='username'/> <br/>
                        Password: <br/>
                        <input type='password' name='password'/> <br/>
                        <button type="submit">Login</button>
                    </form>
                </div>
                <div style={this.divStyle}>
                    <h1>Register</h1>
                    <form onSubmit={this.handleRegisterSubmit}>
                        Username: <br/>
                        <input type='text' name='username'/> <br/>
                        Email: <br/>
                        <input type='email' name='email'/> <br/>
                        Full name: <br/>
                        <input type='text' name='full_name'/> <br/>
                        Password: <br/>
                        <input type='password' name='password'/> <br/>
                        <button type="submit">Register</button>
                    </form>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    setUser: PropTypes.func,
    history: PropTypes.object,
};

export default Login;