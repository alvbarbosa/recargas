import React, { Component } from 'react';
import { Alert  } from "reactstrap";

import RechargeComponent from "../../components/recharge-wait/recharge-wait";
import { firebase } from '../../firebase'
import { ProcessedRejectModal } from "../../components/modal";
import { formatCurrency } from "../../utils";

class RechargeWait extends Component {
  state = {
    listRecharges: [],
    isOpen: false,
    messageModal: "",
    idRecharge: null,
    visibleAlert: false,
    messAlert: "",
  }
  componentDidMount = () => {
    this.rechargeRef().on('child_added', data => { this.addRecharge(data) });
    this.rechargeRef().on('child_changed', data => { this.updateRecharge(data) });
  }

  componentWillUnmount = () => {
    this.rechargeRef().off('child_added', data => { this.addRecharge(data) });
    this.rechargeRef().off('child_changed', data => { this.updateRecharge(data) });
  };

  rechargeRef = () => {
    const rechargeRef = firebase.database.ref(`recharge`).orderByKey().limitToLast(50)
    return rechargeRef
  }

  updateRecharge = recharge => {
    const rech = recharge.val()
    let list = this.state.listRecharges
    list.find(e => e.uid == rech.uid
      && e.timestamp == rech.timestamp
      && e.numberCel == rech.numberCel)
      .status = rech.status
    this.setState({
      listRecharges: list
    })
  }

  addRecharge = recharge => {
    let ref = recharge.val()
    ref.key = recharge.key
    this.setState({
      listRecharges: this.state.listRecharges
        .concat(ref)
        .sort((a, b) => {
          return b.timestamp - a.timestamp
        })
    })
  }

  handleClickTable = id => {
    const { numberCel, valueCel } = this.state
      .listRecharges
      .find(e => e.key == id)

    this.setState({
      isOpen: true,
      messageModal:
        <h5>Procesar la recarga al número {numberCel} por un valor
        de {formatCurrency(parseFloat(valueCel), "$")}</h5>,
      idRecharge: id,
    })
    setTimeout(() => {
      this.setState({
        isOpen: false
      })
    }, 1);
  }

  handleModalReject = () => {
    this.rechargeState(2)
  }
  handleModalApprove = () => {
    const { uid, valueCel } = this.state.listRecharges
      .find(x => x.key == this.state.idRecharge)

    firebase.database.ref(`users/${uid}`).transaction(post => {
      if (post) {
        if (post.balance) {
          const total = parseFloat(post.balance) - parseFloat(valueCel)
          if (total < 0) {
            this.setState({
              visibleAlert: true,
              messAlert: "Revisar el saldo de ese cliente"
            })
          } else {
            post.balance = total
            this.rechargeState(1)
          }
        } else {
          this.setState({
            visibleAlert: true,
            messAlert: "Revisar el saldo de ese cliente"
          })
        }
      }
      return post
    })
  }

  rechargeState = status => {
    if (this.state.idRecharge) {
      firebase.database.ref(`recharge/${this.state.idRecharge}`).update({
        status
      });
      this.setState({
        idRecharge: null,
      })
    }
  }

  onDismiss = event => {
    this.setState({ visibleAlert: false })
  }

  render() {
    return (
      <div>
        <Alert
          color="danger"
          isOpen={this.state.visibleAlert}
          toggle={this.onDismiss}
        >
          {this.state.messAlert}
        </Alert>
        <RechargeComponent
          listRecharges={this.state.listRecharges}
          handleClickTable={this.handleClickTable}
        />
        <ProcessedRejectModal
          isOpen={this.state.isOpen}
          message={this.state.messageModal}
          handleModalApprove={this.handleModalApprove}
          handleModalReject={this.handleModalReject}
          processed="Procesado"
          reject="Rechazado"
        />
      </div>
    );
  }
}

export default RechargeWait;