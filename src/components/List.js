import React, { Component } from 'react';
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText,
  Badge
} from 'reactstrap';
import { formatCurrency } from "../utils/";

export const List = props => {
  const list = props.listRecharges.map((item, index) => {
    return (
      <ListGroupItem key={index} className="list-recharges" disabled tag="a" href="#" action>
        <div>{item.numberCel}</div>
        <div>{formatCurrency(parseFloat(item.valueCel), "$")}</div>
        <div>{(new Date(item.date)).toLocaleString()}</div>
      </ListGroupItem>
    )
  })
  return (
    <Col className="height-70vh">
      <Card>
        <CardHeader className="titulo" style={{ fontSize: 30 }}>
          <h3><i className="fa fa-paper-plane iconos"></i> Ultimas Recargas</h3>
        </CardHeader>
        <CardBody>
          <ListGroup>
            {list}
          </ListGroup>
        </CardBody>
      </Card>
    </Col>
  )
}