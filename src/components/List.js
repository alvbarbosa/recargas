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
import { formatCurrency } from "../utils";

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
        <CardHeader className="text-center" style={{ fontSize: 30 }}>
          Ultimas Recargas
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