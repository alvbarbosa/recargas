import React, { Component } from 'react';
import {
  Row,
  Col
} from "reactstrap";

import { YesNoModal } from "../../components/modal";
import { FormComponent as Form } from '../../components/sales/form';
import { List } from '../../components/sales/list';

class Sales extends Component {
  state = {
    numberCel: "",
    valueCel: 0,
    modal: false,
    messageModal: "",
    listRecharges: [],
    user: null
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
};


export default Sales