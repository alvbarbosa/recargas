import React, { Component } from 'react';
import { Link, Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { Container } from 'reactstrap';
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';
import Record from '../../views/Dashboard/record'
import Purchases from '../../views/Dashboard/purchases'
import Profile from '../../components/Profile/profile'
import RechargeWait from '../../views/recharge-wait'
import Message from '../../components/message/message'
import Sales from '../../components/sales/sales'
import Dashboard from '../../views/Dashboard/';
import Users from '../../components/Users';

import { firebase } from "../../firebase";

class Full extends Component {
  state = {
    user: null
  }

  componentWillMount = () => {
    firebase.auth.onAuthStateChanged(user => {
      if (user) {
        firebase.database.ref(`users/${user.uid}`).once('value').then(snapshot => {
          if (!snapshot.val().enable) {
            alert('Usuario no habilitado')
            firebase.auth.signOut()
          }
        });
        this.setState({ user })
      } else {
        this.props.history.push('/login')
      }
    })
  };

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
                <Route path="/dashboard" name="Dashboard" component={Dashboard} />
                <Route path="/message" name="Message" component={Message} />
                <Route path="/profile" name="Profile" component={Profile} />
                <Route path="/sales" name="Sales" component={Sales} />
                <Route path="/recharge-wait" name="RechargeWait" component={RechargeWait} />
                <Route path="/users" name="Users" component={Users} />
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

export default withRouter(Full);
