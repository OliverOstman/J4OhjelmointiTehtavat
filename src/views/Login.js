import React, { Component } from 'react';

class Login extends Component {
    state = {
        username: '',
        password: '',
        email: '',
        full_name: '',
    };

    handleSubmit = (evt) => {
        evt.preventDefault();
        if (evt.target.length === 3) {
            this.setState({
                [evt.target[0].name]: evt.target[0].value,
                [evt.target[1].name]: evt.target[1].value,
            });
        } else {
            this.setState({
                [evt.target[0].name]: evt.target[0].value,
                [evt.target[1].name]: evt.target[1].value,
                [evt.target[2].name]: evt.target[2].value,
                [evt.target[3].name]: evt.target[3].value,
            });
        }
    };

    divStyle = {
        width: '50%',
    };

    mainStyle = {
        display: 'flex',
    };

    render() {
        return (
            <div style={this.mainStyle}>
                <div style={this.divStyle}>
                    <h1>Login</h1>
                    <form onSubmit={this.handleSubmit}>
                        Username: <br/>
                        <input type='text' name='username' /> <br/>
                        Password: <br/>
                        <input type='password' name='password' /> <br/>
                        <input type='submit'/>
                    </form>
                </div>
                <div style={this.divStyle}>
                    <h1>Register</h1>
                    <form onSubmit={this.handleSubmit}>
                        Username: <br/>
                        <input type='text' name='username' /> <br/>
                        Email: <br/>
                        <input type='text' name='email'/> <br/>
                        Full name: <br/>
                        <input type='text' name='full_name'/> <br/>
                        Password: <br/>
                        <input type='password' name='password' /> <br/>
                        <input type='submit'/>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;