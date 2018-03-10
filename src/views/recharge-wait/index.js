import React, { Component } from 'react';

import RechargeComponent from "../../components/recharge-wait/recharge-wait";
import { firebase } from '../../firebase'

class RechargeWait extends Component {
  state = {
    listRecharges: []
  }
  componentDidMount = () => {
    this.rechargeRef().on('child_added', data => { this.addRecharge(data) });
  }

  componentWillUnmount = () => {
    this.rechargeRef().off('child_added', data => { this.addRecharge(data) });
  };

  rechargeRef = () => {
    const rechargeRef = firebase.database.ref(`recharge`).orderByKey().limitToLast(100)
    return rechargeRef
  }

  addRecharge = recharge => {
    window.firebase = recharge
    this.setState({
      listRecharges: this.state.listRecharges.concat(recharge.val())
    })
    console.log(this.state.listRecharges);
  }

  render() {
    return (
      <RechargeComponent
        listRecharges={this.state.listRecharges}
      />
    );
  }
}

export default RechargeWait;