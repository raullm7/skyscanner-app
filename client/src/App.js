import React, { Component } from 'react';
import querystring from 'querystring';
import logo from './logo.svg';
import './App.scss';

class App extends Component {
  state = {
    response: ''
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.price }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const data = {
      type: 'browsequotes',
      version: 'v1.0',
      country: 'FR',
      currency: 'eur',
      locale: 'en-US',
      originPlace: 'uk',
      destinationPlace: 'us',
      outboundPartialDate: 'anytime',
      inboundPartialDate: 'anytime'
    };
    const response = await fetch('/api/hello?' + querystring.stringify(data));
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">App</h1>
        </header>
        <p className="App-intro">{this.state.response}</p>
      </div>
    );
  }
}

export default App;
