import React from 'react';
import {
  Badge,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink
} from 'reactstrap';

import { formatCurrency } from "../../utils";

const EntryRecharges = props => {
  let list = null
  if (props.listRecharges) {
    list = props.listRecharges.map(item => {
      return (
        <tr>
          <td>{item.numberCel}</td>
          <td>{formatCurrency(parseFloat(item.valueCel), "$")}</td>
          <td>{(new Date(item.timestamp)).toLocaleString()}</td>
          <td><Badge color="warning">En espera</Badge></td>
        </tr>
      )
    })
  }
  return (
    <div className="animated fadeIn">
      <Row>
        <Col xs="12">
          <Card>
            <CardHeader className="titulo">
              <h3><i className="fa fa-hourglass-half"></i> Estado Recargas</h3>
            </CardHeader>
            <CardBody>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Telefono</th>
                    <th>Valor</th>
                    <th>Fecha</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {list}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default EntryRecharges;