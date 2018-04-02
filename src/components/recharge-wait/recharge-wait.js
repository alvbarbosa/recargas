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

const statusRecharge = status => {
  switch (status) {
    case 1:
      return <span className="badge badge-success">Procesado</span>
    case 2:
      return <span className="badge badge-danger">Rechazado</span>
    default:
      return <span className="badge badge-light">En espera</span>
      break;
  }
}

const EntryRecharges = props => {
  let list = null
  if (props.listRecharges) {
    list = props.listRecharges.map(item => {
      return (
        <tr
          onDoubleClick={() => item.status == 1 ? null : props.handleClickTable(item.key)}
          className="text-center"
          key={item.key}
        >
          <td>{item.numberCel}</td>
          <td>{item.username}</td>
          <td>{formatCurrency(parseFloat(item.valueCel), "$")}</td>
          <td>{(new Date(item.timestamp)).toLocaleString()}</td>
          <td>{statusRecharge(item.status)}</td>
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
              <h3><i className="fa fa-hourglass-half iconos"></i> Estado Recargas</h3>
            </CardHeader>
            <CardBody>
              <Table hover responsive >
                <thead>
                  <tr className="text-center">
                    <th>Telefono</th>
                    <th>Usuario</th>
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