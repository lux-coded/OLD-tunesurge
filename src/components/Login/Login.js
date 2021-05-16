import React from 'react';
import axios from 'axios';
import './Login.scss';

const AUTH_URL = 'https://accounts.spotify.com/authorize?client_id=7ed88be146d5439d8458b6c9ee0adad4&show_dialog=true&response_type=code&redirect_uri=http://localhost:3000/&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state';

class Login extends React.Component {
  state = ({ client_id: '7ed88be146d5439d8458b6c9ee0adad4', client_secret: '93fe25608d164f5b83f1d3560416d989' });

  componentDidMount() {
    // console.log(window.location.href);
    const urlCode = window.location.href.split('?code=');
    const code = urlCode[1];
    console.log(urlCode[0], urlCode[1]);

    // const authorizationClientIds = `${this.state.client_id}:${this.state.client_secret}`
  }

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
