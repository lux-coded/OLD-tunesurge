import { useState, useEffect } from 'react';
import axios from 'axios';
import history from '../history.js';

const useAuth = function (code) {
  const [ accessToken, setAccessToken ] = useState();
  const [ refreshToken, setRefreshToken ] = useState();
  const [ expiresIn, setExpiresIn ] = useState();

  useEffect(() => {

    if (!code) return;

    axios
      .post('http://localhost:5000/login', {
        code
      })
      .then((res) => {
        console.log(res);
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        setExpiresIn(res.data.expiresIn);
        localStorage.setItem('accessToken', res.data.accessToken);
        history.push(`/`);
        // window.location = '/';
      })
      .catch((err) => {
        console.error(err);
        window.location = '/';
      })

  }, [code]);

  useEffect(() => {

    if (!refreshToken || !expiresIn) return;

    const timeout = setTimeout(function () {

      axios
        .post('http://localhost:5000/refresh', {
          refreshToken,
        })
        .then((res) => {
          // console.log(res);
          setAccessToken(res.data.accessToken);
          setExpiresIn(res.data.expiresIn);
          localStorage.setItem('accessToken', res.data.accessToken);
        })
        .catch((err) => {
          // console.error(err);
          window.location = '/';
        })

    }, (expiresIn - 60) * 1000 );

    return () => clearTimeout(timeout);

  }, [refreshToken, expiresIn]);

  return accessToken;
}

export default useAuth;
