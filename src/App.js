import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  componentWillMount(){
  }
  constructor(props) {
    super(props);
    this.state = {value: '', listItems: '', posts: []};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const values = event.target.value.split('\n');
    this.setState({value: values});
  }

  handleSubmit(event) {
    const numbers = this.state.value;
    const newlist = numbers.map((number) =>
      axios.get("https://omgvamp-hearthstone-v1.p.mashape.com/cards/" + number.split(' ')[1] + "?collectible=1", {
      headers: {'X-Mashape-Key': '********'}
      }).then(res => {
        <li><img src={res.data[0].img} alt={res.data[0].name} /></li>
      })
    );
    this.setState({listItems: newlist});
    event.preventDefault();
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <form onSubmit={this.handleSubmit}>
          <label>
            Deck:
            <textarea rows="21" cols="40" type="text" value={this.state.value} onChange={this.handleChange} style={{resize: 'none'}} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <ul>{this.state.listItems}</ul>
      </div>
    );
  }
}

export default App;
