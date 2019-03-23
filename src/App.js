import React, { Component } from 'react';
import './App.css';
import Table from './components/table'

class App extends Component {
  state = {
    picArray: []
  };

  componentDidMount() {
    let test = [];
    fetch('http://media.mw.metropolia.fi/wbma/media/').then((response) => {
      return response.json();
    }).then((json) => {
      test = json;
      Promise.all(test.map(item => {
        return fetch('http://media.mw.metropolia.fi/wbma/media/' + item.file_id).
        then(response => {
          return response.json();
        });
      })).then(items => {
        this.setState({picArray: items})
      });
    }).catch((error) => {
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
