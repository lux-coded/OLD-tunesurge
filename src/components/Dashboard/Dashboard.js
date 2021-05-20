import React, { useState } from 'react';
import { connect, useSelector } from 'react-redux';
import useAuth from '../useAuth.js';

import './Dashboard.scss';

const Dashboard = () => {
  const [ token, setToken ] = useState('');
  const loginCode = useSelector(state => state.getLoginCode);
  // console.log(loginCode);
  const accessToken = useAuth(loginCode);
  setToken(accessToken);

  return (
    <section id='dashboard'>
      <h1>Dashboard</h1>
      <div>
        <h3>My Profile</h3>
      </div>
      <div>
        <h3>Library</h3>
        {/* <p>{this.props.getLoginCode}</p> */}
      </div>
    </section>
  );
}

export default connect()(Dashboard);
