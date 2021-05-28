import React from 'react';
import './Nav.scss';

class Nav extends React.Component {

  render() {
    return (
      <nav>
        <a href='/'>
          <h1 id='nav-logo'>TuneSurge</h1>
        </a>
        <span className="material-icons nav-menu-icon">
          menu
        </span>
      </nav>
    );
  }
}

export default Nav;
