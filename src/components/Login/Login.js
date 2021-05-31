import React from 'react';
import './Login.scss';

const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=7ed88be146d5439d8458b6c9ee0adad4&show_dialog=true&response_type=code&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&scope=streaming%20user-read-email%20user-top-read%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`;

class Login extends React.Component {

  render() {
    return (
      <header className='welcome-header'>
        <div className='welcome-quote'>
          <h1>The <span>music</span> app you've been searching for.</h1>
          <h1><span>And quite more.</span></h1>
        </div>
        <a href={AUTH_URL}>Log In with Spotify</a>
      </header>
    );
  }
}

export default Login;
