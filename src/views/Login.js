import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {login, register, getUser} from '../utils/MediaAPI';

class Login extends Component {
    state = {
        user: {
            username: '',
            password: '',
            email: '',
            full_name: '',
        },
        toggleForm: true,
    };

    divStyle = {
        width: '50%',
    };

    mainStyle = {
        display: 'flex',
    };

    handleLoginSubmit = (evt) => {
        evt.preventDefault();
        this.doLogin();
    };

    handleRegisterSubmit = (evt) => {
        evt.preventDefault();
        register(this.state.user).then(user => {
            console.log(user);
            this.doLogin();
        });
    };

    doLogin = () => {
        login(this.state.user.username, this.state.user.password).then(response => {
            console.log(response);
            this.props.setUser(response.user);
            localStorage.setItem('token', response.token);
            this.props.history.push('/home');
        });
    };

    handleInputChange = (evt) => {
        const target = evt.target;
        const value = target.value;
        const name = target.name;

        this.setState((prevState) => {
            return {
                user: {
                    ...prevState.user,
                    [name]: value,
                },
            };
        });
    };

    checkUserAvailable = (evt) => {
      //tarkasta onko käyttäjätunnus vappa
      //jos ei, tee esim alert()
    };

    changeToggleForm = () => {
      if (this.state.toggleForm === true) {
          this.setState({toggleForm: false})
      }  else {
          this.setState({toggleForm: true})
      }
    };

    componentDidMount() {
        if (localStorage.getItem('token') !== null) {
            getUser(localStorage.getItem('token')).then(response => {
                this.props.setUser(response);
                this.props.history.push('/home');
            });
        }
    }

    render() {
        if (this.state.toggleForm === true) {
            return (
                <div style={this.mainStyle}>
                    <div style={this.divStyle}>
                        <h1>Login</h1>
                        <form onSubmit={this.handleLoginSubmit}>
                            Username: <br/>
                            <input type='text' name='username' value={this.state.user.username} onChange={this.handleInputChange}/> <br/>
                            Password: <br/>
                            <input type='password' name='password' value={this.state.user.password} onChange={this.handleInputChange}/> <br/>
                            <button type="submit">Login</button>
                        </form>
                        <br/>
                        <button onClick={this.changeToggleForm}>No account?</button>
                    </div>
                </div>
            )
        } else {
            return (
                <div style={this.mainStyle}>
                    <div style={this.divStyle}>
                        <h1>Register</h1>
                        <form onSubmit={this.handleRegisterSubmit}>
                            Username: <br/>
                            <input type='text' name='username' value={this.state.user.username} onChange={this.handleInputChange}/> <br/>
                            Email: <br/>
                            <input type='email' name='email' value={this.state.user.email} onChange={this.handleInputChange}/> <br/>
                            Full name: <br/>
                            <input type='text' name='full_name' value={this.state.user.full_name} onChange={this.handleInputChange}/> <br/>
                            Password: <br/>
                            <input type='password' name='password' value={this.state.user.password} onChange={this.handleInputChange}/> <br/>
                            <button type="submit">Register</button>
                        </form>
                        <br/>
                        <button onClick={this.changeToggleForm}>Already have an account?</button>
                    </div>
                </div>
            )
        }
    }
}

Login.propTypes = {
    setUser: PropTypes.func,
    history: PropTypes.object,
};

export default Login;