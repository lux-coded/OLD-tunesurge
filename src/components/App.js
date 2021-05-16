import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../history.js';
import Login from './Login/Login.js';
import Dashboard from './Dashboard/Dashboard.js';
import Nav from './Nav/Nav.js';

const code = new URLSearchParams(window.location.search).get('code');

// const isLoggedIn = code ? <Login /> : <Dashboard />;

class App extends React.Component {

  render() {
    return (
      <Router history={history}>
        <Nav />
        <Switch>
          <Route path='/' exact component={code ? Dashboard : Login} />
          // <Route path='/' exact component={Dashboard} />
        </Switch>
      </Router>
    );
  }
}

export default App;
