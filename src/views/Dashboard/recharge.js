import React, { Component } from 'react';
import { FormComponent as Form } from '../../components/Form';
import { List as List } from '../../components/List';
import {
  Row,
  Col
} from 'reactstrap';

class Record extends Component {

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col md="6" xs="12">
            <Form />
          </Col>
          <Col md="6" xs="12">
            <List />
          </Col>
        </Row>
      </div>
    )
  }
}

export default Record;
