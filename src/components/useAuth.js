import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import history from '../history.js';

// import { getAccessToken } from '../actions/authActions.js';

const useAuth = function (code) {
  const [ accessToken, setAccessToken ] = useState();
  const [ refreshToken, setRefreshToken ] = useState();
  const [ expiresIn, setExpiresIn ] = useState();

  const requestURL = process.env.REACT_APP_SERVER_URL;

  useEffect(() => {

    if (!code) return;

    axios
      .post(`${requestURL}login`, {
        code
      })
      .then((res) => {
        console.log(requestURL);
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        setExpiresIn(res.data.expiresIn);
        // getAccessToken(res.data.accessToken);
        history.push(`/`);
      })
      .catch((err) => {
        console.log(err);
        // window.location = '/';
      })

  }, [code]);

  useEffect(() => {

    if (!refreshToken || !expiresIn) return;

    const timeout = setTimeout(function () {

      axios
        .post(`${requestURL}refresh`, {
          refreshToken,
        })
        .then((res) => {
          setAccessToken(res.data.accessToken);
          setExpiresIn(res.data.expiresIn);
        })
        .catch((err) => {
          window.location = '/';
        })

    }, (expiresIn - 60) * 1000 );

    return () => clearTimeout(timeout);

  }, [refreshToken, expiresIn]);

  return accessToken;
}

// const mapDispatchToProps = (dispatch) => ({
//   getAccessToken: () => dispatch({ type: 'GET_ACCESS_TOKEN' })
// });

export default useAuth;
