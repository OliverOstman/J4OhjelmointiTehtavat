import React, { Component } from 'react';

class Login extends Component {
    state = {
        username: '',
        password: '',
        email: '',
        full_name: '',
    };

    handleInputChange = (evt) => {
        const target = evt.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
    };

    test = (item) => {
        console.log("test");
        item.preventDefault();
    };

    render() {
        return (
            <React.Fragment>
                <div>
                    <h1>Login</h1>
                    <form onSubmit={this.test}>
                        Username: <br/>
                        <input type='text' name='username' value={this.state.username} onChange={this.handleInputChange}/> <br/>
                        Password: <br/>
                        <input type='password' name='password' value={this.state.password} onChange={this.handleInputChange}/> <br/>
                        <input type='submit'/>
                    </form>
                </div>
                <div>
                    <h1>Register</h1>
                    <form>
                        Username: <br/>
                        <input type='text' name='username'/> <br/>
                        Email: <br/>
                        <input type='text' name='email'/> <br/>
                        Full name: <br/>
                        <input type='text' name='full_name'/> <br/>
                        Password: <br/>
                        <input type='password' name='password'/> <br/>
                        <input type='submit'/>
                    </form>
                </div>
            </React.Fragment>
        );
    }
}

export default Login;