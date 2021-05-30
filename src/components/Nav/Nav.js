import React from 'react';
import './Nav.scss';

import DashboardControls from '../DashboardControls/DashboardControls.js';

class Nav extends React.Component {

  sideNavToggle() {
    const sideNav = document.getElementById('mobile-dashboard-sidebar');
    sideNav.classList.toggle('hidden');
  }

  render() {
    return (
      <nav>
        <a href='/'>
          <h1 id='nav-logo'>TuneSurge</h1>
        </a>
        <div className='nav-menu'>
          <span className="material-icons nav-menu-icon" onClick={this.sideNavToggle}>
            menu
          </span>
          <DashboardControls />
        </div>

      </nav>
    );
  }
}

export default Nav;
