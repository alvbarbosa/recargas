import React, { Component } from 'react';
import {
  CardFooter,
  ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText,
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

export const List = props => {
  return (
    <Col className="height-70vh">
      <Card>
        <CardHeader className="titulo" style={{ fontSize: 30 }}>
          <h3 className="titulo"><i className="fa fa-paper-plane iconos"></i> Ventas</h3>
        </CardHeader>
        <CardBody>
          <Table responsive>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Valor</th>
                <th>Fecha y Hora</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Samppa Nori</td>
                <td>100000</td>
                <td>12/2/2018</td>
              </tr>
              <tr>
                <td>Samppa Nori</td>
                <td>100000</td>
                <td>12/2/2018</td>
              </tr>
              <tr>
                <td>Samppa Nori</td>
                <td>100000</td>
                <td>12/2/2018</td>
              </tr>
              <tr>
                <td>Samppa Nori</td>
                <td>100000</td>
                <td>12/2/2018</td>
              </tr>
              <tr>
                <td>Samppa Nori</td>
                <td>100000</td>
                <td>12/2/2018</td>
              </tr>
              <tr>
                <td>Samppa Nori</td>
                <td>100000</td>
                <td>12/2/2018</td>
              </tr>
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </Col>
  )
}