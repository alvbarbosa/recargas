import React, { Component } from 'react';
import { Link, Switch, Route, Redirect, withRouter } from 'react-router-dom';
import ReactLoading from 'react-loading';
import { Container } from 'reactstrap';
import Push from 'push.js'

import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Aside from '../../components/Aside/';
import Record from '../../views/Dashboard/record'
import Purchases from '../../views/Dashboard/purchases'
import Profile from '../../components/Profile/profile'
import RechargeWait from '../../views/recharge-wait'
import Message from '../../components/message/message'
import Sales from '../../views/sales'
import Dashboard from '../../views/Dashboard/';
import UserNotEnable from '../../views/not-enable'
import Users from '../../views/Users';
import { firebase } from "../../firebase";
import { formatCurrency } from "../../utils";

class Full extends Component {
  state = {
    user: null,
    enable: false,
    rol: false,
    loading: true,
    balance: null,
  }

  componentWillMount = () => {
    const { database } = firebase
    firebase.auth.onAuthStateChanged(user => {
      if (user) {
        database.ref(`users/${user.uid}`).once('value')
          .then(snapshot => {
            const { enable, rol, balance } = snapshot.val()
            if (enable) {
              user.rol = rol
              this.setState({
                enable: true,
                rol,
                user,
                balance,
              });
            }
            if (rol == 'admin') {
              this.rechargeRef().on('child_added', data => { this.addRecharge(data) });
            }
            database.ref(`users/${user.uid}`).on('child_changed', data => { this.updateUser(data) });
            this.setState({ loading: false })
          })
      } else {
        this.props.history.replace('/login')
      }
    })
  };

  componentWillUnmount = () => {
    const { user } = this.state
    const { database } = firebase
    if (this.state.user) {
      if (this.state.rol == 'admin') {
        this.rechargeRef().off('child_added', data => { this.addRecharge(data) });
      }
      database.ref(`users/${user.uid}`).off('child_changed', data => { this.updateUser(data) });
    }
  };

  addRecharge = recharge => {
    const ref = recharge.val()
    const history = this.props.history
    if (!ref.status) {
      Push.create("Nueva Recarga!", {
        body: `Celular ${ref.numberCel} por un valor de ${ref.valueCel}`,
        icon: 'img/recharge-icon.png',
        requireInteraction: true,
        onClick: function () {
          window.focus();
          this.close();
          history.push({ pathname: '/recharge-wait', })
        }
      });
      var audio = new Audio('img/exquisite.mp3');
      audio.play();
    }
  }

  rechargeRef = () => {
    const rechargeRef = firebase.database.ref(`recharge`).orderByKey().limitToLast(1)
    return rechargeRef
  }

  updateUser = data => {
    this.setState({
      balance: data.val()
    })
  }

  render() {
    if (this.state.loading) return (
      <div className="app flex-column align-items-center justify-content-center" >
        <ReactLoading type="spinningBubbles" color="#20a8d8" />
      </div>)

    if (!this.state.enable) return <UserNotEnable />

    const balance = this.state.balance || "0"
    return (
      <div className="app">
        <Header balance={balance} />
        <div className="app-body">
          <Sidebar rol={this.state.rol} {...this.props} />
          <main className="main">
            <Breadcrumb />
            <Container fluid className="full-container">
              <Switch>
                <Route path="/purchases" name="Purchases" render={() => <Purchases user={this.state.user} />} />
                <Route path="/record" name="Record" component={Record} />
                <Route path="/dashboard" name="Dashboard" render={props => (<Dashboard balance={balance} />)} />
                <Route path="/message" name="Message" component={Message} />
                <Route path="/profile" name="Profile" component={Profile} />
                {
                  this.state.rol == "admin"
                  && <Route path="/recharge-wait" name="RechargeWait" component={RechargeWait} />}
                {
                  (this.state.rol == "admin" || this.state.rol == "dist")
                  && <Route path="/users" name="Users" render={() => <Users user={this.state.user} />} />
                }
                <Redirect from="/" to="/dashboard" />
              </Switch>
            </Container>
          </main>
          <Aside />
        </div>
      </div>
    );
  }
}

export default withRouter(Full);
