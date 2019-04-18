import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {login, register, getUser, checkUser} from '../utils/MediaAPI';
import {TextField, Button} from '@material-ui/core';
import {Send} from '@material-ui/icons'
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {withStyles} from "@material-ui/core/styles";
import red from '@material-ui/core/colors/red';

const styles = theme => ({
    container: {
        width: '50%',
        padding: '1rem',
    },
    button: {
        margin: theme.spacing.unit,
    },
    alert: {
        color: red[500],
    }
});

class Login extends Component {
    state = {
        user: {
            username: '',
            password: '',
            repeatPassword: '',
            email: '',
            full_name: '',
        },
        toggleForm: true,
        validUser: true,
        message: '',
    };

    handleLoginSubmit = (evt) => {
        evt.preventDefault();
        this.doLogin();
    };

    handleRegisterSubmit = () => {
        const user = {...this.state.user};
        delete user.repeatPassword;
        register(user).then(user => {
            if (user.message !== undefined) {
                this.setState({message: user.message});
                return;
            }
            this.doLogin();
        });
    };

    doLogin = () => {
        login(this.state.user.username, this.state.user.password).then(response => {
            if (response.user !== undefined) {
                this.props.setUser(response.user);
                localStorage.setItem('token', response.token);
                this.props.history.push('/home');
            } else {
                this.setState({message: response.message});
            }
        }).catch((err) => {
            console.log(err);
        });
    };

    handleInputChange = (evt) => {
        const target = evt.target;
        const value = target.value;
        const name = target.name;

        this.setState((prevState) => ({
            user: {
                ...prevState.user,
                [name]: value,
            },
        }));
        if (name === 'username') {
            this.checkUsername(target.value);
        }
    };

    checkUsername = (username) => {
        checkUser(username).then((result) => {
            this.setState({validUser: result.available});
        });
    };

    changeToggleForm = () => {
      if (this.state.toggleForm === true) {
          this.setState({toggleForm: false});
          this.setState({message: ''});
      }  else {
          this.setState({toggleForm: true});
          this.setState({message: ''});
      }
    };

    componentDidMount() {
        if (localStorage.getItem('token') !== null) {
            getUser(localStorage.getItem('token')).then(response => {
                this.props.setUser(response);
                this.props.history.push('/home');
            });
        }
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            return value === this.state.user.password;
        });
        ValidatorForm.addValidationRule('isUserAvailable', () => {
            return this.state.validUser;
        });
    }

    render() {
        const {classes} = this.props;
        if (this.state.toggleForm === true) {
            return (
                <div className={classes.container}>
                    <h1>Login</h1>
                    <form onSubmit={this.handleLoginSubmit}>
                        <TextField fullWidth required name="username" id="username"
                                   label="Username"
                                   value={this.state.user.username}
                                   onChange={this.handleInputChange}/>
                        <TextField fullWidth required name="password" type="password"
                                   id="password"
                                   label="Password"
                                   value={this.state.user.password}
                                   onChange={this.handleInputChange}/>
                        <Button className={classes.button} variant="contained"
                                color="primary" type="submit">
                            <Send/>&nbsp;Login
                        </Button>
                    </form>
                    <br/>
                    <button onClick={this.changeToggleForm}>No account?</button>
                    <br/>
                    <p className={classes.alert}>
                        {this.state.message}
                    </p>
                </div>
            )
        } else {
            return (
                <div className={classes.container}>
                    <h1>Register</h1>
                    <ValidatorForm instantValidate={true} onSubmit={this.handleRegisterSubmit}
                                   onError={errors => console.log(errors)}>
                        <TextValidator fullWidth required name="username" id="username"
                                       label="Username"
                                       value={this.state.user.username}
                                       onChange={this.handleInputChange}
                                       validators={[
                                           'required',
                                           'minStringLength:3',
                                           'isUserAvailable']}
                                       errorMessages={[
                                           'this field is required',
                                           'minimum 3 characters',
                                           'username is not available']}/>
                        <TextValidator fullWidth required name="password" type="password"
                                       id="password" label="Password"
                                       value={this.state.user.password}
                                       onChange={this.handleInputChange}
                                       validators={[
                                           'required',
                                           'minStringLength:5']}
                                       errorMessages={[
                                           'this field is required',
                                           'minimum 5 characters']}/>
                        <TextValidator fullWidth required name="repeatPassword" type="password"
                                       id="repeatPassword" label="Repeat password"
                                       value={this.state.user.repeatPassword}
                                       onChange={this.handleInputChange}
                                       validators={[
                                           'isPasswordMatch',
                                           'required']}
                                       errorMessages={[
                                           'password mismatch',
                                           'this field is required']}/>
                        <TextValidator fullWidth required name="email" id="email" label="Email"
                                       value={this.state.user.email}
                                       onChange={this.handleInputChange}
                                       validators={[
                                           'required',
                                           'isEmail']}
                                       errorMessages={[
                                           'this field is required',
                                           'email is not valid']}/>
                        <TextField fullWidth name="full_name" id="full_name"
                                   label="Full name"
                                   value={this.state.user.full_name}
                                   onChange={this.handleInputChange}/>
                        <Button className={classes.button} variant="contained"
                                color="primary" type="submit">
                            <Send/>&nbsp;Register
                        </Button>
                    </ValidatorForm>
                    <br/>
                    <button onClick={this.changeToggleForm}>Already have an account?</button>
                    <br/>
                    <p className={classes.alert}>
                        {this.state.message}
                    </p>
                </div>
            )
        }
    }
}

Login.propTypes = {
    setUser: PropTypes.func,
    history: PropTypes.object,
    classes: PropTypes.object,
};

export default withStyles(styles) (Login);