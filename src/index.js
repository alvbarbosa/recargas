import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';

// Styles
// Import Flag Icons Set
import 'flag-icon-css/css/flag-icon.min.css';
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
import '../scss/style.scss'
// Temp fix for reactstrap
import '../scss/core/_dropdown-menu-right.scss'

// Containers
import Full from './containers/Full/'
import Login from './views/login/login.js'
import Register from './views/register'
import ResetPassword from './views/reset-password'

ReactDOM.render((
  <HashRouter>
    <Switch>
      <Route path="/login" name="Login" component={Login} />
      <Route path="/register" name="Register" component={Register} />
      <Route path="/resetPassword" name="ResetPassword" component={ResetPassword} />
      <Route path="/" name="Home" component={Full} />
    </Switch>
  </HashRouter>
), document.getElementById('root'));
