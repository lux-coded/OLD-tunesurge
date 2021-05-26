import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import history from '../history.js';
import Login from './Login/Login.js';
import Dashboard from './Dashboard/Dashboard.js';
import Nav from './Nav/Nav.js';
import { getLoginCode, getAccessToken } from '../actions/authActions.js';

// console.log(code);

// const isLoggedIn = code ? <Login /> : <Dashboard />;
const code = new URLSearchParams(window.location.search).get('code');

class App extends React.Component {
  // state: { savedAccessToken: '' }

  componentDidMount() {
    const savedAccessToken = localStorage.getItem('accessToken');
    this.props.getLoginCode(code);
    this.props.getAccessToken(savedAccessToken);
    // this.setState({ savedAccessToken: savedAccessToken });
    // this.setState({ currentAccessToken: getAccessToken });
  }

  checkSession = () => {
    if (this.state.savedAccessToken || code) return true;
  }

  render() {
    return (
      <Router history={history}>
        <Nav />
        <Switch>
          <Route path='/' exact component={code ? Dashboard : Login} />
          <Route path='/search/:query' exact component={Dashboard} />
          <Route path='/artists/:id' exact component={Dashboard} />
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

// const mapDispatchToProps = (dispatch) => ({
//   getLoginCode,
//   getAccessToken
// })

export default connect(
  null,
  {getLoginCode, getAccessToken}
)
(App);
