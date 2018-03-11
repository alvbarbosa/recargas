import React, { Component } from 'react';
import {
  Row,
  Col
} from 'reactstrap';

import { FormComponent as Form } from '../../components/Form';
import { List } from '../../components/List';
import { YesNoModal } from "../../components/modal";
import { formatCurrency } from "../../utils";
import { firebase } from "../../firebase";


class Dashboard extends Component {
  state = {
    numberCel: "",
    valueCel: "",
    modal: false,
    messageModal: "",
    listRecharges: [],
    user: null
  }

  componentDidMount = () => {
    firebase.auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ user })
        this.rechargeRef().on('child_added', data => { this.addRecharge(data) });
        this.rechargeRef().on('child_changed', data => { this.updateRecharge(data) });
      } else {
        this.props.history.push('/login')
      }
    })
  }

  componentWillUnmount = () => {
    if (this.state.user) {
      this.rechargeRef().off('child_added', data => { this.addRecharge(data) });
      this.rechargeRef().off('child_changed', data => { this.updateRecharge(data) });
    }
  };

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
    this.setState({
      listRecharges: this.state.listRecharges.concat(recharge.val())
    })
  }


  handleRecharge = event => {
    let messageModal = (
      <div>
        <h3>Celular:
          <span className="text-danger" >{this.state.numberCel}</span>
        </h3>
        <h3>Valor:
          <span className="text-danger" >{formatCurrency(parseFloat(this.state.valueCel), "$")}</span>
        </h3>
        <h3 className="text-success" >¿Estan correctos los datos?</h3>
      </div>
    )
    this.setState({ messageModal, modal: true })
    event.preventDefault();
  }
  handleChangeCel = event => {
    this.setState({ numberCel: event.target.value })
  }
  handleChangeValue = event => {
    this.setState({ valueCel: event.target.value })
  }
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  handleModalYes = () => {
    const { numberCel, valueCel } = this.state
    const myUserId = this.state.user.uid;
    const rechargeRef = firebase.database.ref(`recharge`)
    const newPostRef = rechargeRef.push();
    const timestamp = (new Date()).getTime()
    newPostRef.set({
      numberCel,
      valueCel,
      timestamp,
      uid: myUserId
    });
    this.toggle()
    this.setState({
      numberCel: "",
      valueCel: "",
    })
  }

  rechargeRef = () => {
    const myUserId = this.state.user.uid;
    const rechargeRef = firebase.database
      .ref(`recharge`)
      .orderByChild('uid')
      .equalTo(myUserId)
    return rechargeRef
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col md="6" xs="12">
            <Form
              handleRecharge={this.handleRecharge}
              handleChangeCel={this.handleChangeCel}
              handleChangeValue={this.handleChangeValue}
              valueCel={this.state.numberCel}
              valueValue={this.state.valueCel}
            />
          </Col>
          <Col md="6" xs="12">
            <List
              // listRecharges={this.state.listRecharges}
              listRecharges={Object.assign([], this.state.listRecharges)}
            />
          </Col>
        </Row>
        <YesNoModal
          toggle={this.toggle}
          isOpen={this.state.modal}
          message={this.state.messageModal}
          handleModalYes={this.handleModalYes}
          handleModalNo={this.toggle}
        />
      </div>
    )
  }
}

export default Dashboard;
