import { useState, useEffect } from 'react';
import axios from 'axios';

const useAuth = function (code) {
  // const [ accessToken, setAccessToken ] = useState();
  // const [ refreshToken, setRefreshToken ] = useState();
  // const [ exipresIn, setExpiresIn ] = useState();

  useEffect(() => {
    axios
      .post('http://localhost:5000/login', {
        code
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [code])
}

export default useAuth;
