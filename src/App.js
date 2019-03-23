import React, { Component } from 'react';
import './App.css';
import Table from './components/table'

class App extends Component {
  state = {
    picArray: []
  };

  componentDidMount() {
    fetch('http://media.mw.metropolia.fi/wbma/media').then((response) => {
      console.log(response.json());
      return response.json();
    }).then(json => this.setState({ picArray: json}))
        .catch((error) => {
          console.log(error);
        })
  }

  render() {
    return (
      <div className="App">
        <Table picArray={this.state.picArray}/>
      </div>
    );
  }
}

export default App;
