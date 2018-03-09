import React, { Component } from 'react';
import {
  Row,
  Col
} from 'reactstrap';

import { FormComponent as Form } from '../../components/sales/form';
import { List } from '../../components/sales/list';
import { YesNoModal } from "../../components/modal";
import { formatCurrency } from "../../utils";
import { firebase } from "../../firebase";


class Dashboard extends Component {
  state = {
    numberCel: "",
    valueCel: 0,
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
      } else {
        this.props.history.push('/login')
      }
    })
  }

  componentWillUnmount = () => {
    if (this.state.user)
      this.rechargeRef().off('child_added', data => { this.addRecharge(data) });
  };

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
    const newPostRef = this.rechargeRef().push();
    const date = (new Date()).getTime()
    newPostRef.set({
      numberCel,
      valueCel,
      date,
    });
    this.toggle()
  }

  rechargeRef = () => {
    const myUserId = this.state.user.uid;
    const rechargeRef = firebase.database.ref(`recharge/${myUserId}`)
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
            />
          </Col>
          <Col md="6" xs="12">
            <List
              listRecharges={this.state.listRecharges}
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
