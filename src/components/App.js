import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import history from '../history.js';
import Login from './Login/Login.js';
import Dashboard from './Dashboard/Dashboard.js';
import Nav from './Nav/Nav.js';
import getLoginCode from '../actions/getLoginCode.js';

// console.log(code);

// const isLoggedIn = code ? <Login /> : <Dashboard />;
const code = new URLSearchParams(window.location.search).get('code');

class App extends React.Component {
  componentDidMount() {
    this.props.getLoginCode(code);
  }

  render() {
    return (
      <Router history={history}>
        <Nav />
        <Switch>
          <Route path='/' exact component={code ? Dashboard : Login} />
        </Switch>
      </Router>
    );
  }
};

// const mapStateToProps = (state) => ({
//   getLoginCode: state.getLoginCode
// })
//
// const mapDispatchToProps = (dispatch) => ({
//   getLoginCode: getLoginCode
// });

export default connect(
  null,
  { getLoginCode }
)
(App);
