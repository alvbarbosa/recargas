import React, { Component } from 'react';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import { Container } from 'reactstrap';
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';
import Record from '../../views/Dashboard/record'
import Recharge from '../../views/Dashboard/recharge'
import Purchases from '../../views/Dashboard/purchases'
import Profile from '../../components/Profile/profile'
import RechargeWait from '../../components/recharge-wait/recharge-wait'

import Dashboard from '../../views/Dashboard/';

class Full extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <div className="app-body">
          <Sidebar {...this.props} />
          <main className="main">
            <Breadcrumb />
            <Container fluid className="full-container">
              <Switch>
                <Route path="/purchases" name="Purchases" component={Purchases} />
                <Route path="/record" name="Record" component={Record} />
                <Route path="/recharge" name="Recharge" component={Recharge} />
                <Route path="/dashboard" name="Dashboard" component={Dashboard} />
                <Route path="/profile" name="Profile" component={Profile} />
                <Route path="/recharge-wait" name="RechargeWait" component={RechargeWait} />
                <Redirect from="/" to="/dashboard" />
              </Switch>
            </Container>
          </main>
          <Aside />
        </div>
        {/* <Footer /> */}
      </div>
    );
  }
}

export default Full;
